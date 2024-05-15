"use client";
import React, { useEffect } from "react";
import { usePorcupine } from "@picovoice/porcupine-react";
import App from "@/app/components/App";

export default function VoiceWidget() {
  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
  } = usePorcupine();


  const porcupineKeyword = { 
      publicPath: "/ok.ppn",
      label: "a" // An arbitrary string used to identify the keyword once the detection occurs.
  }
  const porcupineModel = { publicPath: "/porcupine_params.pv" }


  useEffect(() => {
    init(
      "accessKey",
      porcupineKeyword,
      porcupineModel
    );
  }, []);


  useEffect(() => {
    if (keywordDetection !== null) {
      // ... use keyword detection result
      console.log("keywordDetection: ", keywordDetection);
    }
  }, [keywordDetection]);

  const st = async () => {
    await start();
    console.log("isLoaded: ", isLoaded);
    console.log("isError: ", error);
    console.log("isListening: ", isListening);
    console.log("Listening");
 
  };

  const sto = async () => {
    await stop();
    console.log("Stopped");
  };


  // ... render component
return (
  <div>
   <button onClick={st}>Start</button>
    <button onClick={sto}>Stop</button>
    <div className="flex justify-center h-100 w-100">
          <App />
        </div>
  </div>
);
}

