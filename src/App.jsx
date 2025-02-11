import { useState , useRef , useEffect} from 'react'
import './App.css'
import Header from './components/Header'
import Homepage from './components/Homepage'
import FileDisplay from './components/FileDisplay'
import Information from './components/Information'
import Transcribing from './components/Transcribing'
import { MessageTypes } from './utils/presets'

function App() {
  const[file , setFile] = useState(null)
  const[audioStream, setAudioStream] = useState(null)
  const [output,setOuput] = useState(true)
  const [loading , setLoading] = useState(false)
  const [downloading , setDownloading] = useState(false)
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
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url) , { type: 'module' })
    }

    // function used to handle the communication between the main application and web work thread
    const onMessageReceived = async (e) => {
      switch (e.data.type){
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOuput(e.data.results)
          console.log(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
        default:
          console.error('Unknown message type:', e.data.type);
      }
    }

    // this is used to add event listener to the worker for the message event
    worker.current.addEventListener('message', onMessageReceived)

    return () => 
      worker.current.removeEventListener('message', onMessageReceived)

  }, [])

  // Function to read audio from the files for transcription and return 
  async function readAudioFrom(file){
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio 
  }

  // Function to handle the form submission for the audio file
  async function handleFormSubmission(){
    if (!file && !audioStream) {return}

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header/>
        {output ? (
          <Information output={output} finished={finished}/>
        ) : loading ? (
          <Transcribing/>
        ) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={audioStream}/>
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
