import React, { useState ,useEffect , useRef } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
  const { output } = props
  const [tab , setTab] = useState('transcriptions')
  const [translation , setTranslation] = useState(null)
  const [toLanguage , setToLanguage] = useState('null')
  const [translating, setTranslating] = useState(null)

  console.log(output)

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url) , { type: 'module' })
    }

    // function used to handle the communication between the main application and web work thread
    const onMessageReceived = async (e) => {
      switch (e.data.type){
        case 'initiate':
          console.log('DOWNLOADING')
          break;
        case 'progress':
          console.log('LOADING')
          break;
        case 'update':
          setTranslation(e.data.output)
          console.log(e.data.output)
          break;
        case 'complete':
          setTranslating(false)
          console.log("DONE")
          break;
        default:
          console.error('Unknown message type:', e.data.type);
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => 
      worker.current.removeEventListener('message', onMessageReceived)

  }, [])

  const textElement = tab === 'transcriptions' ? output.map(val => val.text) : translation || 'No translation'

  // function for copy to clipboard
  function handleCopy(){
    navigator.clipboard.writeText(textElement)
  }

  // function for download 
  function handleDownload() {
    const element = document.createElement('a')
    const file = new Blob([textElement] , {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `FreeScribe_${new Date().toString()}.txt`
    document.body.appendChild(element)
    document.click()
  }

  function generateTranslation() {
    if (translating || toLanguage === 'Select language'){
      return
    }

    setTranslating(true)

    worker.current.postMessage({
      text: output.map(val => val.text),
      src_lang: 'eng-latn',
      tgt_lang: toLanguage 
    })

  }

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 bold">Transcription</span>
      </h1>

       <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center '>
          <button onClick={() => setTab('transcriptions')} className={'px-4 duration-200 py-1 ' + (tab === 'transcriptions' ? ' bg-blue-300 text-white ' : ' text-blue-400 hover:text-blue-600 ')} > Transcriptions </button>
          <button onClick={() => setTab('translations')} className={'px-4 duration-200 py-1 ' + (tab === 'translations' ? ' bg-blue-300 text-white ' : ' text-blue-400 hover:text-blue-600 ')} > Translations </button>
       </div>
      <div className='my-8 flex flex-col '>
       {tab === 'transcriptions' ? (
          <Transcription {...props} textElement={textElement}/>
       ) : (
          <Translation {...props } textElement={textElement} toLanguage={toLanguage} translating={translating} setTranslation={setTranslation} setTranslating={setTranslating} setToLanguage={setToLanguage}  generateTranslation={generateTranslation} />
       )}
       </div>
       <div className="flex items-center gap-4 mx-auto ">
          <button onClick={handleCopy} title="copy" className='bg-white text-blue-400 hover:text-blue-600 duration-200 px-2
          aspect-square grid place-items-center rounded ' >
             <i class="fa-solid fa-copy"></i>
          </button>
          <button onClick={handleDownload} title="download" className='bg-white text-blue-400 hover:text-blue-600 duration-200 px-2
          aspect-square grid place-items-center rounded ' >
            <i class="fa-solid fa-download"></i>
          </button>
       </div>
    </main>
  )
}
