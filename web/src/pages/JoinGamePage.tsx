import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';

function JoinGamePage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gamePin, setGamePin] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

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

    newSocket.on('joined-game', () => {
      console.log('Successfully joined game');
      // Navigate to the game display page when successfully joined
      navigate('/game/play', { 
        state: { 
          gamePin: parseInt(gamePin),
          playerName: playerName
        }
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [navigate, gamePin, playerName]);

  const handleJoinGame = () => {
    if (!socket || !gamePin || !playerName) {
      alert('Please enter both name and game PIN');
      return;
    }
    socket.emit('join-game', { 
      gamePin: parseInt(gamePin), 
      playerName 
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Game</h1>
        
        {/* Connection Status */}
        <div className={`text-sm mb-4 text-center ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
          {isConnected ? 'Connected to server' : 'Disconnected'}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game PIN
            </label>
            <input
              type="number"
              value={gamePin}
              onChange={(e) => setGamePin(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter game PIN"
            />
          </div>

          <button
            onClick={handleJoinGame}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinGamePage; 