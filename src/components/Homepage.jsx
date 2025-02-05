import React , { useState, useEffect, useRef } from "react";


export default function Homepage(props) {
  const { setFile, setAudioStream } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  // function for enabling the recording
  async function startRecording() {
    let tempStream;
    console.log('Start Recording');

    try {
      const streamData = navigator.mediaDevices.getUserMedia({ audio: true , video:false });
      tempStream = streamData
    } catch(err) {
      console.log(err.message);
      return
    }
    setRecordingStatus("recording");

    // The media create new Media recorder instance using the stream data
    const media = new MediaRecorder(tempStream, { type : mimeType });


    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [] ;
    mediaRecorder.current.ondataavailable = (events) =>{
       if(typeof events.data === 'undefined'){
         return
       }
       if (events.data.size === 0){
         return
       }
       localAudioChunks.push(event.data)
      }
      setAudioChunks(localAudioChunks)
  }

  // function for stopping the recording
  async function stopping() {
    // Stopping function 
    setRecordingStatus("inactive");
    console.log('Stop Recoding')
    // Blob
    mediaRecorder.current.stop();
    mediaRecorder.current.onStop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
    }
  }






  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-6 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base ">
        Or{" "}
        <label className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200">
          upload{" "}
          <input
            onChange={(e) => {
              const tempfile = e.target.files[0];
              setFile(tempfile);
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wave"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-500">Free now free forever. </p>
    </main>
  );
}
