import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
 const[lenght, setLenght] = useState(8)
 const[numberAllowed, setNumberAllowed] = useState(false)
 const[charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState('')
  const passwordref=useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass=" "
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   if(numberAllowed) str+="0123456789"
   if(charAllowed) str+="!@#$%^&*()_+"
   for(let i=1; i<=lenght; i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length+1))
    }
    setPassword(pass)
  }, [lenght, numberAllowed, charAllowed, setPassword])
  const copytoclipboard = useCallback(() => {
    passwordref.current.select();
    window.navigator.clipboard.writeText(password)
  }, [password])
useEffect(() => {passwordGenerator()}, [lenght, numberAllowed, charAllowed, passwordGenerator])

  
  return (
   <>
   <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-blue-500">
    <h1 className='text-white text-center my-3'>Password Generator</h1>

    <div className=" bg-white flex shadow rounded-lg overflow-hidden mb-4">
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly 
      ref={passwordref}/>
      <button onClick={copytoclipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={lenght}
        className='cursor-pointer' 
        onChange={(e) =>{setLenght(e.target.value)}}/>
        <label >Lenght:{lenght}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox" 
        defaultChecked={numberAllowed}
        id="numberInput"
        onChange={()=>{
          setNumberAllowed((prev) => !prev)
        }}/>
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
   </div>
   </>
  )
}

export default App
