import { useFlashCardStore } from '../../stores/FlashcardStore';

const EditDeckClassModal = () => {
    const { classDeckName, setDeckName } = useFlashCardStore();

    const dismissModal = () => {
        (document.getElementById('edit_deck_class_modal') as HTMLDialogElement).close();
    }

    return (
        <dialog id="edit_deck_class_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Deck Name: </h3>
                <input type="text" placeholder="Type here" className="input input-bordered w-full mt-4"
                    value={classDeckName}
                    onChange={(e) => setDeckName(e.target.value)}
                />
                <button className="btn mt-4 btn-success" onClick={dismissModal}>Save</button>
            </div>
        </dialog>
    )
};

export default EditDeckClassModal;