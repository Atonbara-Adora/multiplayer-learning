import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface Player {
  name: string;
  score: number;
}

function NewGamePage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gamePin, setGamePin] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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

  const sendTestQuestion = () => {
    if (socket && gamePin) {
      const testQuestion = {
        question: "What is 2+2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
      };
      socket.emit('send-question', { gamePin, question: testQuestion });
    }
  };

  return (
    <div className="p-8">
      {/* Connection Status */}
      <div className={`text-sm mb-4 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
        {isConnected ? 'Connected to server' : 'Disconnected'}
      </div>

      {/* Game Creation */}
      {!gamePin ? (
        <button
          onClick={createGame}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
              className={`px-4 py-2 rounded ${
                gameStarted || players.length === 0
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

export default NewGamePage;
