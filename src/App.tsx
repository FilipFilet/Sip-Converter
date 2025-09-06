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
          <h1>DrukKompasset</h1>
          <i>Konverterer dine slurke på farten!</i>
        </header>
        <div id="currentConversions">
          <p>1 shot = {sipToShots} slurke</p>
          <p>1 drink = {sipToDrinks} slurke</p>
        </div>
        <SipForm onConvert={handleSipChange} currentShots={sipToShots} currentDrinks={sipToDrinks}></SipForm> {/* Sending "handleSipChange" to the SipForm as a prop */}
        
        <button id="editBtn" className='conversionButton' onClick={() => setShowModal(true)}>Redigér konvertering</button>


        <p className={(shots > 0 || drinks > 0 || sips > 0 ? '' : 'hidden')}>Du skal drikke {drinks} drinks, {shots} shots og {sips} slurke</p>
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
