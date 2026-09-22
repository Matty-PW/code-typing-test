import { useState, useRef, useEffect } from 'react'
import "./App.css"
import { languages, pickSnippet } from './snippets'


function App() {
  const [typed, setTyped] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [snippet, setSnippet] = useState(() => pickSnippet(language))
  let characters = snippet.split("")
  const startTime = useRef(null)
  const spanRefs = useRef([])
  const [cursorLeft, setCursorLeft] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeout = useRef(null)


  useEffect(() => {
    const currentSpan = spanRefs.current[typed.length]
    if (currentSpan) {
      setCursorLeft(currentSpan.offsetLeft)
    }
  }, [typed])

  
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
    setSnippet(pickSnippet(language, snippet))
}

  function handleLanguageChange(lang) {
    setLanguage(lang)
    setTyped("")
    startTime.current = null
    setSnippet(pickSnippet(lang))
}

  function isFinished() {
    return typed.length >= characters.length
  }


  return (
    <div className="app-container">

      <h1 className="title">Code Typing Test</h1>

      <div className="languages">
        {languages.map((lang) =>
          <button key={lang}
          className={lang === language ? "language active" : "language"}
          onClick={() => handleLanguageChange(lang)}
          >
            {lang}
          </button>
        )}
      </div>
      <div className="typing-area">
        <input
          className="hidden-input"
          disabled={isFinished()}
          value={typed}
          onChange={(e) => {
            if (!typed) {
              startTime.current = Date.now()
            }
              setTyped(e.target.value)

              setIsTyping(true)
              clearTimeout(typingTimeout.current)
              typingTimeout.current = setTimeout(() => {
                setIsTyping(false)
              }, 400)
        }}
        />


        <div className="snippet">
          {characters.map((char, index) =>
            <span key={index}
            ref={(e1) => (spanRefs.current[index] = e1)}
            className={getStatus(index)}
            >
              {char}
            </span>
          )}
          <div className={`gliding-cursor ${isTyping ? "no-blink" : ""}`} style={{ left: cursorLeft}}></div>
        </div>
      </div>

      <div className="stats">
      {calculateWPM() !== null && <p>WPM: {calculateWPM()}</p>}
      {calculateAccuracy() !== null && <p>Accuracy: {calculateAccuracy()}%</p>}
      </div>
      
      <button className="restart-button" onClick={handleRestart}>↻</button>
    </div>
  )
}


export default App