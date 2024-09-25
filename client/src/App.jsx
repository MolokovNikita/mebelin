import { useState } from 'react'
import './styles/App.css'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
        <img className = "logo" src="logo.jpeg" alt="logo" />
       </div>
    </>
  )
}

export default App
