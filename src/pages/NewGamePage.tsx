const NewGamePage = () => {
    return (
        <div className="flex flex-col justify-center items-center p-8">
            <h1 className='text-3xl'>New Game</h1>

            <div className="flex overflow-x-auto space-x-4 mt-4">
                {['Silvana', 'Atonbara', 'Yongye'].map((player, index) => (
                    <PlayerGrid key={index} name={player} />
                ))}
            </div>

            <button className="btn btn-primary mt-4">
                Start Game
            </button>
        </div>
    );
};

const PlayerGrid = ({ name }: {
    name: string;
}) => {
    return (
        <div className="flex-shrink-0 p-4 bg-gray-200 rounded-lg w-36 h-36 flex items-center justify-center">
            {name}
        </div>
    );
};


export default NewGamePage;