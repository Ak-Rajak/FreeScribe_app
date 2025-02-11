import React, { useState } from 'react'
import Transcription from './Transcription'
import Translation from './Translation'

export default function Information(props) {
  const {output} = props 
  const [tab , setTab] = useState('transcriptions')

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 max-w-prose w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your <span className="text-blue-400 bold">Transcription</span>
      </h1>

       <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center '>
          <button onClick={() => setTab('transcriptions')} className={'px-4 duration-200 py-1 ' + (tab === 'transcriptions' ? ' bg-blue-300 text-white ' : ' text-blue-400 hover:text-blue-600 ')} > Transcriptions </button>
          <button onClick={() => setTab('translations')} className={'px-4 duration-200 py-1 ' + (tab === 'translations' ? ' bg-blue-300 text-white ' : ' text-blue-400 hover:text-blue-600 ')} > Translations </button>
       </div>

       {tab === 'transcriptions' ? (
          <Transcription {...props}/>
       ) : (
          <Translation {...props}/>
       )}
    </main>
  )
}
