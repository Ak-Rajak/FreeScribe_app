import React from 'react'
import { LANGUAGES } from '../utils/presets'

export default function Translation(props) {
    const [textElement  , toLanguage , translating , setToLanguage , generateTranslation ] = props
    
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto ">
      {!translating && (<div className="flex flex-col gap-1">
        <p className='text-xs sm:text-sm font-medium text-slate-500 mr-auto'>To language</p>
        <div className="flex item-stretch gap-2">
            <select className='flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-blue-300 duration-200 p-2 rounded' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
              <option value='select language'>Select language</option>
              {Object.entries(LANGUAGES).map(([key , value]) => { return (<option value={value} key={key}>{key}</option>
            )})}
            </select>
            <button onClick={generateTranslation} className='flex px-2 py-3 rounded-lg text-blue-400 hover:text-blue-600 duration-200'>Translate</button>
        </div>
      </div>)}
      {textElement && (
        <p className="">{textElement}</p>
      )}
      {(translating && !translating) && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}
    </div>
  )
}
