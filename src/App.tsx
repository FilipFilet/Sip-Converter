import { useState } from 'react'
import SipForm from './SipForm.tsx'
import EditForm from './Edit.tsx'
import Conversion from './interfaces/Conversion.ts'
import { createPortal } from 'react-dom';


import './App.css'

function App() {
  const [sipToShots, setSipToShots] = useState(6)
  const [sipToDrinks, setSipToDrinks] = useState(12)
  const [shots, setShots] = useState(0)
  const [drinks, setDrinks] = useState(0)
  const [sips, setSips] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const handleSipChange = (conversionResult: Conversion) => {
    setShots(conversionResult.shots)
    setDrinks(conversionResult.drinks)
    setSips(conversionResult.sips)
  }


  return (
    <main id="content">
      <section id="converterWrapper">
        <header id="headerWrapper">
          <h1>Sip Converter</h1>
          <i>Converting your sips on the fly</i>
        </header>
        <div id="currentConversions">
          <p>1 shot = {sipToShots} sips</p>
          <p>1 drink = {sipToDrinks} sips</p>
        </div>
        <SipForm onConvert={handleSipChange} currentShots={sipToShots} currentDrinks={sipToDrinks}></SipForm> {/* Sending "handleSipChange" to the SipForm as a prop */}
        <p>Converted sips into {drinks} drinks, {shots} Shots and {sips} Sips</p>
        <button id="editBtn" className='conversionButton' onClick={() => setShowModal(true)}>Edit Sip Conversion</button>
      </section>

      {/* Possible that an interface would be cleaner */}
      {showModal && createPortal(

        <EditForm currentShots={sipToShots}
          currentDrinks={sipToDrinks}
          setCurrentShots={setSipToShots}
          setCurrentDrinks={setSipToDrinks}
          onClose={() => setShowModal(false)}></EditForm>,
        document.body // The modal will be rendered in the body of the document instead of inside the parent
      )}

    </main>
  )
}

export default App
