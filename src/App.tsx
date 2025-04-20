import { useState } from 'react'
import SipForm from './SipForm.tsx'
import EditForm from './Edit.tsx'
import Conversion from './interfaces/conversion.ts'

import './App.css'

function App() {
  const [sipToShots, setSipToShots] = useState(6)
  const [sipToDrinks, setSipToDrinks] = useState(12)
  const [shots, setShots] = useState(0)
  const [drinks, setDrinks] = useState(0)
  const [sips, setSips] = useState(0)

  const handleSipChange = (conversionResult: Conversion) => {
    setShots(conversionResult.shots)
    setDrinks(conversionResult.drinks)
    setSips(conversionResult.sips)
  }


  return (
    <main id="content">
      <h1>Sip Converter</h1>
      <i>Converting your sips on the fly</i>
      <p>1 shot = {sipToShots} sips</p>
      <p>1 drink = {sipToDrinks} sips</p>
      <SipForm onConvert={handleSipChange}></SipForm>
      <p>Converted sips into {drinks} drinks, {shots} Shots and {sips} Sips</p>
      <EditForm></EditForm>
    </main>
  )
}

export default App
