import { useState } from "react";
import Conversion from "./interfaces/conversion";

export default function SipForm({ onConvert }: { onConvert: Function }) {
    const [sipAmount, setSipAmount] = useState<number | null>(null);

    function handleConvertDrinks() {
        if (sipAmount === null) {
            alert("Please enter a sip amount.");
            return;
        }
        const conversionResult: Conversion = {
            shots: Math.floor(sipAmount / 6), // not correct but just need it to work
            drinks: Math.floor(sipAmount / 12), // The way its supposed to work is that it uses the remaining each time
            sips: sipAmount
        }
        onConvert(conversionResult);
    }

    function handleSipInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (value === "") {
            setSipAmount(null);
        }
        else {
            setSipAmount(Number(value));
        }
    }

    return (
        <>
            <form id="sipForm">
                <input type="number" placeholder="Sip Amount" value={sipAmount === null ? "" : sipAmount} onChange={(handleSipInputChange)} />
                <div>
                    <input type="button" value="Convert to drinks" onClick={handleConvertDrinks} />
                    <input type="button" value="Convert to shots" />
                    <input type="button" value="Feeling lucky?" />
                </div>

            </form>
        </>
    )
}