import React , {useState , useEffect , useRef} from 'react'

export default function FileDisplay(props) {
    const { file , handleAudioReset , audioStream }  = props

    const [recordingStatus , setRecordingStatus] = useState('inactive');
    cosnt [audioChunks , setAudioChunks] = useState([]);
    const [duration , setDuration] = useState(0);

    const mediaRecorder = useRef('inactive');
    const mimeTypw = 'audio/webm';


  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-6 justify-center pb-20 w-fit max-w-full mx-auto">
        <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">Your <span className="text-blue-400 bold">files</span></h1>
        <div className="mx-auto flex flex-col text-left my-4">
            <h3 className='font-semibold'>Name</h3>
            <p>{file.name}</p>
        </div>
        <div className="flex text-center justify-between gap-4">
            <button onClick={handleAudioReset} className='text-slate-400 hover:text-slate-600 duration-200'>
                Reset
            </button>
            <button className='specialBtn px-3 p-2 rounded-ld text-blue-400 flex items-center font-medium gap-2'>
                <p>Transcribe</p>
                <i className="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </main>
  )
}
