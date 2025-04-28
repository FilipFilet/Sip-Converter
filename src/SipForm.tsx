import { useState } from "react";
import Conversion from "./interfaces/Conversion.ts";

export default function SipForm({ onConvert, currentShots, currentDrinks }: { onConvert: Function, currentShots: number, currentDrinks: number }) {
    const [sipAmount, setSipAmount] = useState<number | null>(null);


    // Function to handle the conversion to drinks
    function handleConvert(conversionType: 'drinks' | 'shots' | 'lucky') {
        //debugger;
        if (sipAmount === null) {
            alert("Please enter a sip amount.");
            return;
        }

        const finalType = conversionType === 'lucky' ? (Math.random() < 0.5 ? 'drinks' : 'shots') : conversionType; // Randomly choose between drinks and shots if feeling lucky

        const divisor = finalType === 'drinks' ? currentDrinks : currentShots; // Set the conversion type to drinks
        const conversionCalc: number = Math.floor(sipAmount / divisor);

        const conversionResult: Conversion = {
            drinks: finalType === 'drinks' ? conversionCalc : 0,
            shots: finalType === 'shots' ? conversionCalc : 0,
            sips: sipAmount - conversionCalc * divisor
        }
        console.log(`Clicked convert to ${conversionType}`); // for testing
        onConvert(conversionResult); // Calling the function passed from the App component to update the state in the App component
    }

    function handleSipInputChange(event: React.ChangeEvent<HTMLInputElement>) { // The event is a change event from the input field
        const value = event.target.value; // The value of the event, so when a change in value occurs, we get the value of the input field
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
                <input id="sipInput" className="inputStyle" type="number" placeholder="Sip Amount" value={sipAmount === null ? "" : sipAmount} onChange={(handleSipInputChange)} />
                <div>
                    <input type="button" value="Convert to drinks" onClick={() => handleConvert('drinks')} />
                    <input type="button" value="Convert to shots" onClick={() => handleConvert('shots')} />
                    <input type="button" value="Feeling lucky?" onClick={() => handleConvert('lucky')} />
                </div>

            </form>
        </>
    )
}