import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useDeckStore } from '../stores/DeckStore';
import { useNavigate } from 'react-router-dom';

interface Player {
  name: string;
  score: number;
}

interface Question {
  text: string;
  answers: string[];
  correctAnswer: string;
}

function NewGamePage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gamePin, setGamePin] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState('');
  const { deck } = useDeckStore();
  const navigate = useNavigate();
  const [currentDeckQuestions, setCurrentDeckQuestions] = useState<Question[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('game-created', (pin: number) => {
      console.log('Game created with PIN:', pin);
      setGamePin(pin);
    });

    newSocket.on('player-joined', (updatedPlayers: Player[]) => {
      console.log('Players updated:', updatedPlayers);
      setPlayers(updatedPlayers);
    });

    newSocket.on('send-next-question', () => {
      sendQuestion();
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createGame = () => {
    if (socket) {
      socket.emit('create-game');
    }
  };

  const startGame = () => {
    if (socket && gamePin) {
      socket.emit('start-game', { gamePin });
      setGameStarted(true);
    }
  };

  const getRandomQuestion = () => {
    const deckQuestions = deck.find((d) => d.classDeckName === selectedDeck)?.questions;
    if (!deckQuestions || deckQuestions.length === 0) return null;

    const availableQuestions = deckQuestions.filter((_, index) => !usedQuestions.has(index));
    
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set());
      return deckQuestions[Math.floor(Math.random() * deckQuestions.length)];
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const originalIndex = deckQuestions.indexOf(availableQuestions[randomIndex]);
    setUsedQuestions(prev => new Set(prev).add(originalIndex));
    
    return availableQuestions[randomIndex];
  };

  const sendQuestion = () => {
    if (socket && gamePin) {
      const randomQuestion = getRandomQuestion();
      if (randomQuestion) {
        const question = {
          question: randomQuestion.text,
          options: randomQuestion.answers,
          correctAnswer: randomQuestion.correctAnswer,
        };
        socket.emit('send-question', { gamePin, question });
      }
    }
  };

  const sendTestQuestion = () => {
    sendQuestion();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Connection Status */}
      <div className='flex flex-row'>
        <button
          onClick={() => navigate('/')}
          className="absolute left-10 top-4 text-2xl text-black hover:text-gray-300"
        >
          ←
        </button>
        <div className={`text-sm mb-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          {isConnected ? 'Connected to server' : 'Disconnected'}
        </div>
      </div>

      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          {selectedDeck === '' ? 'Select Deck' : selectedDeck}
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
          </svg>

        </div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          {deck.map((deck, index) => (
            <li key={index} onClick={() => setSelectedDeck(deck.classDeckName)}><a>{deck.classDeckName}</a></li>
          ))
          }
        </ul>
      </div>


      <div className="flex overflow-x-auto space-x-4 mt-4">
        {['Silvana', 'Atonbara', 'Yongye'].map((player, index) => (
          <PlayerGrid key={index} name={player} />
        ))}
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 bg-gray-200 rounded-xl w-36 h-36 flex items-center justify-center">
            <span className="text-black text-8xl">+</span>
          </div>
          <span className="text-black mt-2">Add Player</span>
        </div>
      </div>

      {/* Game Creation */}
      {!gamePin ? (
        <button
          onClick={createGame}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Create New Game
        </button>
      ) : (
        <div className="space-y-4">
          {/* Game PIN Display */}
          <div className="text-4xl font-bold p-4 bg-gray-100 rounded">
            Game PIN: {gamePin}
          </div>

          {/* Player List */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Players ({players.length})</h2>
            {players.map((player, index) => (
              <div key={index} className="py-1">
                {player.name} - Score: {player.score}
              </div>
            ))}
          </div>

          {/* Game Controls */}
          <div className="space-x-4">
            <button
              onClick={startGame}
              disabled={gameStarted || players.length === 0}
              className={`px-4 py-2 rounded ${gameStarted || players.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
              Start Game
            </button>

            {gameStarted && (
              <button
                onClick={sendTestQuestion}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Send Test Question
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const PlayerGrid = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 p-4 bg-gray-200 rounded-2xl w-36 h-36 flex items-center justify-center"></div>
      <span className="text-black mt-2">{name}</span>
    </div>
  );
};

export default NewGamePage;
