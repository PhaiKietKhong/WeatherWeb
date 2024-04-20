import { useRef } from 'react'
import './App.css'
import Loading from './Components/Loading/Loading'
import Weather from './Components/Weather'

function App() {


  return (
    <div className='container'>
      <Weather/>
      <div className='overlay'></div>
    </div>   
  )
}

export default App
