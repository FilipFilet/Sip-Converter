import { useState } from 'react';

export default function EditForm({ currentShots, currentDrinks, setCurrentShots, setCurrentDrinks, onClose }:
    { currentShots: number, currentDrinks: number, setCurrentShots: Function, setCurrentDrinks: Function, onClose: () => void }) {

    const [shotEditValue, setShotEditValue] = useState<number | null>(currentShots);
    const [drinkEditValue, setDrinkEditValue] = useState<number | null>(currentDrinks);

    function handleEditChange(event: React.ChangeEvent<HTMLInputElement>, setEdit: Function) {
        const value = event.target.value;
        if (value === "") {
            setEdit(null);
            return;
        }

        setEdit(Number(value));
    }

    function handleEdit() {
        if (shotEditValue === null || drinkEditValue === null) {
            alert("Please enter a valid value.");
            return;
        }
        setCurrentDrinks(drinkEditValue);
        setCurrentShots(shotEditValue);

        onClose(); // Close the modal after editing
    }



    return (
        <>
            <div id="dark"></div>
            <form id="editForm" className="hidden">
                <label htmlFor="editShots">Shots Amount</label>
                <input type="number" id="editShots" className="inputStyle" value={shotEditValue === null ? "" : shotEditValue} onChange={(e) => handleEditChange(e, setShotEditValue)} />
                <br />
                <label htmlFor="editShots">Drinks Amount</label>
                <input type="number" id="editDrinks" className="inputStyle" value={drinkEditValue === null ? "" : drinkEditValue} onChange={(e) => handleEditChange(e, setDrinkEditValue)} />
                <br />
                <div className="editButtons">
                    <input type="button" value="Confirm" onClick={handleEdit} />
                    <input type="button" value="Cancel" onClick={onClose} />
                </div>
            </form>
        </>
    )
}