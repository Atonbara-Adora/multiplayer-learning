import { useState } from "react";
import { useDeckStore } from "../stores/DeckStore";
import { useNavigate } from "react-router-dom";

const NewGamePage = () => {
    const { deck } = useDeckStore();
    const navigate = useNavigate();

    const [selectedDeck, setSelectedDeck] = useState('');

    const startGame = () => {
        console.log('Start Game');
        navigate('/gametime');
    }

    return (
        <div className="flex flex-col justify-center items-center p-8">
            <h1 className="text-3xl">New Game</h1>

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

            <button className="btn btn-primary mt-4" onClick={startGame}>Start Game</button>
        </div>
    );
};

const PlayerGrid = ({ name }: { name: string }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex-shrink-0 p-4 bg-gray-200 rounded-2xl w-36 h-36 flex items-center justify-center"></div>
            <span className="text-black mt-2">{name}</span>
        </div>
    );
};

export default NewGamePage;
