import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <h1>This is Main file</h1> */}
    <Home/>
     
    </>
  )
}

export default App
