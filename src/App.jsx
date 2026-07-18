import { useState, useRef } from 'react'
import "./App.css"


function App() {
  const [typed, setTyped] = useState("")
  const snippet = "const x = 5;"
  let characters = snippet.split("")
  const startTime = useRef(null)

  
function getStatus(index) {
  if (index >= typed.length) return "untyped"
  if (typed[index] === characters[index]) return "correct"
  else return "incorrect"
}

  function calculateWPM() {
  if (!isFinished()) return null
  const elapsedMS = Date.now() - startTime.current
  const elapedMinutes = elapsedMS / 1000 / 60
  const wordsTyped = characters.length / 5
  return Math.round(wordsTyped / elapedMinutes)
}
 
  function calculateAccuracy() {
    if (!isFinished()) return null // not finished yet
    const correctCount = characters.filter((char, index) =>
      typed[index] === characters[index]).length
    return Math.round((correctCount / characters.length) * 100)
}

  function handleRestart() {
    setTyped("")
    startTime.current = null
}

  function isFinished() {
    return typed.length >= characters.length
  }


  return (
    <div className="app-container">
      
      <div className="typing-area">
        <input
          className="hidden-input"
          disabled={isFinished()}
          value={typed}
          onChange={(e) => {
            if (!typed) {
              startTime.current = Date.now()
            }
              setTyped(e.target.value), console.log(startTime.current)
        }}
        />


        <div className="snippet">
          {characters.map((char, index) =>
            <span key={index} className={getStatus(index)}>{char}</span>
          )}
        </div>
      </div>

      {calculateWPM() !== null && <p>WPM: {calculateWPM()}</p>}
      {calculateAccuracy() !== null && <p>Accuracy: {calculateAccuracy()}%</p>}
      <button className="restart-button" onClick={handleRestart}>Restart</button>
    </div>
  )
}


export default App