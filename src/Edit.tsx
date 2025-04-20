export default function EditForm() {
    return (
        <>
            <button id="editBtn">Edit Sip Conversion</button>
            <form id="editForm" className="hidden">
                <input type="number" id="editShots" value="1" />
                <br />
                <input type="number" id="editDrinks" value="1" />
                <br />
                <input type="button" value="Confirm" />
                <input type="button" value="Cancel" />
            </form>
        </>
    )
}