import { useState , useRef , useEffect} from 'react'
import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'

function App() {
  const[file , setFile] = useState(null)
  const[audioStream, setAudioStream] = useState(null)
  const [output,setOuput] = useState(null)
  const [loading , setLoading] = useState(false)
  const [finished , setFinished] = useState(false)

  // boolean check for audioStream
  const isAudioAvailable = file || audioStream

  // function to used to set the audioStream
  function handleAudioReset(){
    setFile(null)
    setAudioStream(null)
  }

  // This is useRef for ml code running in the background
  const worker = useRef(null)

  // useEffect for the worker used ml code to execute
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./'))
    }
  }, [])

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
