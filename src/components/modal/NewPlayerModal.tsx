import usePlayerStore from "../../stores/PlayerStore";

const NewPlayerModal = () => {
    const { name, url, setName, setUrl } = usePlayerStore();

    // const dismissModal = () => {
    //     (document.getElementById('edit_deck_class_modal') as HTMLDialogElement).close();
    // }

    return (
        <dialog id="add_new_player_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Player Name: </h3>
                <input type="text" placeholder="Type here" className="input input-bordered w-full mt-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <h3 className="font-bold text-lg">Player Profile: </h3>
                {/* <input type="text" placeholder="" className="input input-bordered w-full mt-4"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                /> */}
                {/* <button className="btn mt-4 btn-success" onClick={dismissModal}>Save</button> */}
            </div>
        </dialog>
    )
};

export default NewPlayerModal;