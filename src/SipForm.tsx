import { useState } from "react";
import Conversion from "./interfaces/Conversion.ts";

// currentShots are the current conversion amount from sip to shots
// currentDrinks are the current conversion amount from sip to drinks
// onConvert is the function to call when a conversion is made, so the variables are updated in the parent
export default function SipForm({ onConvert, currentShots, currentDrinks }: { onConvert: Function, currentShots: number, currentDrinks: number }) {
    const [sipAmount, setSipAmount] = useState<number | null>(null);


    // Function to handle the conversion to drinks
    // Can only get passed 'drinks', 'shots' or 'lucky'
    function handleConvert(conversionType: 'drinks' | 'shots' | 'lucky') {
        if (sipAmount === null) {
            alert("Please enter a sip amount.");
            return;
        }

        const finalType = conversionType === 'lucky' ? (Math.random() < 0.5 ? 'drinks' : 'shots') : conversionType; // Randomly choose between drinks and shots if feeling lucky

        // Set the conversion type to drinks, if finalType is drinks
        const divisor = finalType === 'drinks' ? currentDrinks : currentShots;

        // sipAmount divided by divisor (currentDrinks or currentShots) to get amount of drinks or shots
        const conversionCalc: number = Math.floor(sipAmount / divisor);

        // Object to hold the conversion result.
        const conversionResult: Conversion = {
            drinks: finalType === 'drinks' ? conversionCalc : 0,
            shots: finalType === 'shots' ? conversionCalc : 0,

            // sipAmount - (conversionCalc * divisor) to get remaining sips
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
                <div className="conversionButtons">
                    <input className="conversionButton" type="button" value="Convert to drinks" onClick={() => handleConvert('drinks')} />
                    <input className="conversionButton" type="button" value="Convert to shots" onClick={() => handleConvert('shots')} />
                    <input className="conversionButton" type="button" value="Feeling lucky?" onClick={() => handleConvert('lucky')} />
                </div>

            </form>
        </>
    )
}