const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow all origins for testing
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

// Store game states
const games = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Host creates a new game
  socket.on('create-game', () => {
    console.log('Attempting to create game for socket:', socket.id);
    const gamePin = Math.floor(Math.random() * 900000) + 100000;
    console.log('Generated PIN:', gamePin);
    
    games.set(gamePin, {
      host: socket.id,
      players: [],
      currentQuestion: null,
      scores: {},
      gameState: 'waiting' // waiting, active, finished
    });
    
    socket.join(gamePin.toString());
    console.log('Emitting game-created event with PIN:', gamePin);
    socket.emit('game-created', gamePin);
    console.log('Current games:', Array.from(games.keys()));
  });

  // Player joins a game
  socket.on('join-game', ({ gamePin, playerName }) => {
    const game = games.get(gamePin);
    
    if (!game) {
      socket.emit('error', 'Game not found');
      return;
    }

    game.players.push({
      id: socket.id,
      name: playerName,
      score: 0
    });

    socket.join(gamePin.toString());
    socket.emit('joined-game', gamePin);
    io.to(gamePin.toString()).emit('player-joined', game.players);
  });

  // Host starts the game
  socket.on('start-game', ({ gamePin }) => {
    const game = games.get(gamePin);
    if (game && game.host === socket.id) {
      game.gameState = 'active';
      io.to(gamePin.toString()).emit('game-started');
    }
  });

  // Host sends a question
  socket.on('send-question', ({ gamePin, question }) => {
    const game = games.get(gamePin);
    if (game && game.host === socket.id) {
      game.currentQuestion = question;
      io.to(gamePin.toString()).emit('new-question', question);
    }
  });

  // Player submits an answer
  socket.on('submit-answer', ({ gamePin, answer }) => {
    console.log('Answer submitted:', { gamePin, answer });
    const game = games.get(gamePin);
    
    if (!game) {
        console.log('Game not found');
        return;
    }
    
    if (game.gameState !== 'active') {
        console.log('Game not active');
        return;
    }
    
    const player = game.players.find(p => p.id === socket.id);
    if (!player) {
        console.log('Player not found');
        return;
    }

    console.log('Current question:', game.currentQuestion);
    const score = calculateScore(answer, game.currentQuestion);
    console.log('Calculated score:', score);
    
    player.score += score;
    console.log('Updated player score:', player.score);
    
    // Send result only to the player who answered
    socket.emit('answer-result', {
        wasCorrect: score > 0,
        score: player.score
    });
    
    // Send score update to all players
    io.to(gamePin.toString()).emit('player-joined', game.players);

    // After a brief delay, send the next question
    setTimeout(() => {
        if (game.host) {
            // Emit event to host to send next question
            io.to(game.host).emit('send-next-question');
        }
    }, 2000); // Wait for 2 seconds after answer
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    games.forEach((game, gamePin) => {
      // Remove player from game
      game.players = game.players.filter(p => p.id !== socket.id);
      // If host disconnects, end the game
      if (game.host === socket.id) {
        io.to(gamePin.toString()).emit('game-ended', 'Host disconnected');
        games.delete(gamePin);
      } else {
        io.to(gamePin.toString()).emit('player-left', game.players);
      }
    });
  });
});

// Add basic error handling
io.engine.on("connection_error", (err) => {
  console.log('Connection error:', err.req);
  console.log('Error message:', err.code, err.message);
});

function calculateScore(answer, question) {
    console.log('Calculating score:', { answer, question });
    
    if (!question || !question.correctAnswer) {
        console.log('No question or correct answer defined');
        return 0;
    }

    // Check if the answer is correct
    if (answer === question.correctAnswer) {
        console.log('Correct answer! +1000 points');
        return 1000;
    }

    console.log('Incorrect answer, 0 points');
    return 0;
}

// Add this after app.use(express.json());
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Add this function to get a random question from the deck
function getRandomQuestion(deck) {
  if (!deck || !deck.questions || deck.questions.length === 0) {
    return null;
  }
  return deck.questions[Math.floor(Math.random() * deck.questions.length)];
} 