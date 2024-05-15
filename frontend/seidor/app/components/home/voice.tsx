"use client";
import React, { useEffect, useState } from "react";
import { usePorcupine } from "@picovoice/porcupine-react";
import { AudioLinesIcon } from "lucide-react";
import Dictaphone from "./stt";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

// const PORCUPINE_KEYWORD_BASE64 = `var modelParams = "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";

// (function() {
//   if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
//     module.exports = modelParams
// })(); `;

// const porcupineKeyword = {
//   publicPath: "/mnt/c/Users/EcoG-user/warehouse/frontend/seidor/public/sei.ppn",
//   }
// const filePath = "/mnt/c/Users/EcoG-user/warehouse/frontend/seidor/public/porcupine_params.pv";
// // const PORCUPINE_MODEL_BASE64 = ;
// // console.log(PORCUPINE_MODEL_BASE64);
// const porcupineModel = {
//   publicPath: filePath,
// }
interface QAPair {
  role: "user" | "system";
  content: string;
}

export default function VoiceWidget() {
  const [question, setQuestion] = useState<string>("");
  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);
  const speak = (text: string) => {
    { 
      let utterance = new SpeechSynthesisUtterance(text);
      let voicesArray = speechSynthesis.getVoices();
      utterance.voice = voicesArray[1];
      speechSynthesis.speak(utterance);}
      return true;
  }

  const query = async (ques: string) => {
    console.log("ques: ", ques);
    const url = "https://warehouse-server.azurewebsites.net/api/query"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "query": ques,
            "previous_messages":
              qaPairs

          }
        ), // The URL you want to scrape
      });

      setQAPairs((prevPairs) => [
        ...prevPairs,
        { role: "user", content: ques },
      ]);
      const data = await response.json();

      setQAPairs((prevPairs) => [
        ...prevPairs,
        { role: "system", content: data.response || "" },
      ]);
      speak(data?.response);

      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
      alert('Scraping failed. Check the console for details.');
    }
  };
  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
    release,
  } = usePorcupine();

  // const [keywordDetected, setKeywordDetected] = useState(false);
  const porcupineKeyword = {
    publicPath: "/sei.ppn",
    label: "a" // An arbitrary string used to identify the keyword once the detection occurs.
  }
  const porcupineModel = { publicPath: "/porcupine_params.pv" }


  useEffect(() => {
    init(
      "ng6pOVNdZq4XZBlOTtC0RLIEDSlVpyKPt8PeSmmcdpQEfDJA9gRrgg==",
      porcupineKeyword,
      porcupineModel
    );
  }, []);


  useEffect(() => {
    if (keywordDetection !== null) {
      // ... use keyword detection result
      console.log("keywordDetection: ", keywordDetection);
      alert("Sei connected!");
      SpeechRecognition.startListening({ continuous: true });
      console.log(SpeechRecognition);
    }
  }, [keywordDetection]);

  const st = async () => {
    await start();
    console.log("isLoaded: ", isLoaded);
    console.log("isError: ", error);
    console.log("isListening: ", isListening);
  };

  const stopp = async () => {
    await stop();}
  const sto = async () => {
    // await stop();
    
    //api call
    console.log(finalTranscript);
    setQuestion(finalTranscript);
    // console.log(question);
    await query(finalTranscript);
    resetTranscript();
    SpeechRecognition.stopListening();

    console.log("Stopped");
  };

  // ... render component


  //stt.tsx
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
}

  return (
      <Dialog>
          <DialogTrigger>
            <AudioLinesIcon className="w-6 h-6 text-black" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Say Hello Sei</DialogTitle>
              <DialogDescription>
                Connect with Sei and ask your questions verbally
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-1/2 overflow-x-auto">{transcript}</div>
            <DialogFooter>
              {!isListening &&
              <Button type="submit" onClick={st}>Connect</Button>}
              {isListening &&      
              <div><Button type="submit" onClick={sto}>Send</Button>
              <DialogClose asChild>
              <Button variant="secondary" onClick={stopp}>Cancel</Button></DialogClose></div>
              } 
            </DialogFooter>
          </DialogContent>
        </Dialog>
  );
}

