function LiveMultipleChoiceDisplay() {
  const handleClick = (option: string) => {
    console.log(`You clicked on ${option}`);
    (document.getElementById("modal2") as HTMLDialogElement)?.showModal();
    
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-6xl text-gray-900 dark:text-white">Question</p>
      <div className="h-screen w-screen grid grid-cols-2 grid-rows-2">
        <div
          className="bg-red-200 flex items-center justify-center cursor-pointer hover:bg-red-300 transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => handleClick("Option 1")}
          onKeyDown={(e) => e.key === "Enter" && handleClick("Option 1")}
        >
          Option 1
        </div>
        <div
          className="bg-blue-200 flex items-center justify-center cursor-pointer hover:bg-blue-300 transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => handleClick("Option 2")}
          onKeyDown={(e) => e.key === "Enter" && handleClick("Option 2")}
        >
          Option 2
        </div>
        <div
          className="bg-green-200 flex items-center justify-center cursor-pointer hover:bg-green-300 transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => handleClick("Option 3")}
          onKeyDown={(e) => e.key === "Enter" && handleClick("Option 3")}
        >
          Option 3
        </div>
        <div
          className="bg-yellow-200 flex items-center justify-center cursor-pointer hover:bg-yellow-300 transition-colors"
          role="button"
          tabIndex={0}
          onClick={() => handleClick("Option 4")}
          onKeyDown={(e) => e.key === "Enter" && handleClick("Option 4")}
        >
          Option 4
        </div>
      </div>


      <dialog id="modal2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Correct!</h3>
          <p className="py-4">Click anywhere to close.</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      ;
    </div>
  );
}

export default LiveMultipleChoiceDisplay;
