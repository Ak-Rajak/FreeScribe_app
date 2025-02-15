import React from "react";

export default function FileDisplay(props) {
  const { file, handleAudioReset, audioStream ,handleFormSubmission} = props;

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20 w-72 sm:w-96 max-w-full mx-auto">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Your <span className="text-blue-400 bold">files</span>
      </h1>
      <div className=" flex flex-col text-left my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file.name : 'Custom audio'}</p>
      </div>
      <div className="flex text-center justify-between gap-4"> 
        <button
          onClick={handleAudioReset}
          className="text-slate-400 hover:text-slate-600 duration-200"
        >
          Reset
        </button>
        <button onClick={handleFormSubmission} className="specialBtn px-3 p-2 rounded-ld text-blue-400 flex items-center font-medium gap-2">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
}
