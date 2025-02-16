import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

function LiveMultipleChoiceDisplay() {
  const location = useLocation();
  const { gamePin, playerName } = location.state || {};
  const [socket, setSocket] = useState<Socket | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [players, setPlayers] = useState<Array<{ name: string; score: number }>>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io('http://localhost:4000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
      // Automatically join the game when connected
      if (gamePin && playerName) {
        newSocket.emit('join-game', { gamePin, playerName });
      }
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('new-question', (newQuestion: Question) => {
      console.log('Received question:', newQuestion);
      setQuestion(newQuestion);
    });

    newSocket.on('player-joined', (updatedPlayers) => {
      console.log('Players updated:', updatedPlayers);
      setPlayers(updatedPlayers);
    });

    newSocket.on('player-answered', (data) => {
      console.log('Player answered:', data);
      const message = data.wasCorrect ? 'Correct!' : 'Incorrect!';
      showModal(message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [gamePin, playerName]);

  const handleClick = (option: string) => {
    console.log(`You clicked on ${option}`);
    if (socket && gamePin) {
      socket.emit('submit-answer', { 
        gamePin: parseInt(gamePin), 
        answer: option 
      });
    }
  };

  const showModal = (message: string) => {
    const modal = document.getElementById("modal2") as HTMLDialogElement;
    if (modal) {
      const titleElement = modal.querySelector('h3');
      if (titleElement) {
        titleElement.textContent = message;
      }
      modal.showModal();
    }
  };

  const getOptionStyles = (index: number) => {
    const colors = {
      0: 'bg-red-200 hover:bg-red-300',
      1: 'bg-blue-200 hover:bg-blue-300',
      2: 'bg-green-200 hover:bg-green-300',
      3: 'bg-yellow-200 hover:bg-yellow-300'
    };
    return colors[index as keyof typeof colors];
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Connection Status */}
      <div className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
        {isConnected ? 'Connected to server' : 'Disconnected'}
      </div>

      {/* Players List */}
      <div className="fixed top-4 right-4 bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Players:</h3>
        {players.map((player, index) => (
          <div key={index} className="text-sm">
            {player.name}: {player.score}
          </div>
        ))}
      </div>

      {/* Question Display */}
      {question && (
        <>
          <p className="text-6xl text-gray-900 dark:text-white mb-4">
            {question.question}
          </p>
          <div className="h-screen w-screen grid grid-cols-2 grid-rows-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`${getOptionStyles(index)} 
                           flex items-center justify-center cursor-pointer 
                           transition-colors text-2xl font-bold`}
                role="button"
                tabIndex={0}
                onClick={() => handleClick(option)}
                onKeyDown={(e) => e.key === "Enter" && handleClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </>
      )}

      <dialog id="modal2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Waiting...</h3>
          <p className="py-4">Click anywhere to close.</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default LiveMultipleChoiceDisplay;
