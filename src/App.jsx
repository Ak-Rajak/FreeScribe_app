import { useState , useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'

function App() {
  const[file , setFile] = useState(null)
  const[audioStream, setAudioStream] = useState(null)
  const [output,setOuput] = useState(true)
  const [loading , setLoading] = useState(false)

  // boolean check for audioStream
  const isAudioAvailable = file || audioStream

  // function to used to set the audioStream
  function handleAudioReset(){
    setFile(null)
    setAudioStream(null)
  }

  useEffect(() => {
    console.log(audioStream)
  } , [audioStream])

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header/>
        {output ? (
          <Information/>
        ) : loading ? (
          <Transcribing/>
        ) : isAudioAvailable ? (
          <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={audioStream}/>
        ) : (
          <Homepage setFile={setFile} setAudioStream={setAudioStream}/>
        )}
        <footer>
        </footer>
      </section>
    </div>
  )
}

export default App
