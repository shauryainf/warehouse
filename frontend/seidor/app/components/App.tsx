"use client";

import { useEffect, useRef, useState } from "react";
import {
  LiveConnectionState,
  LiveTranscriptionEvent,
  LiveTranscriptionEvents,
  useDeepgram,
} from "../context/DeepgramContextProvider";
import {
  MicrophoneEvents,
  MicrophoneState,
  useMicrophone,
} from "../context/MicrophoneContextProvider";
import { disconnect } from "process";

const App: () => JSX.Element = () => {
  const [caption, setCaption] = useState<string>(
    "Powered by Deepgram"
  );
  const [transcribedTexts, setTranscribedTexts] = useState<string[]>([]);
  const { connection, connectToDeepgram, connectionState, disconnectFromDeepgram } = useDeepgram();
  const { setupMicrophone, microphone, startMicrophone, microphoneState } =
    useMicrophone();
  const captionTimeout = useRef<any>();
  const keepAliveInterval = useRef<any>();

  useEffect(() => {
    setupMicrophone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (microphoneState === MicrophoneState.Ready) {
      connectToDeepgram({
        model: "nova-2",
        interim_results: true,
        smart_format: true,
        utterance_end_ms: 1000,
        
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState]);
  
  

  useEffect(() => {
    if (!microphone) return;
    if (!connection) return;

    const onData = (e: BlobEvent) => {
      connection?.send(e.data);
    };
    
    const onTranscript = (data: LiveTranscriptionEvent) => {
      const { is_final: isFinal, speech_final: speechFinal } = data;
      let thisCaption = data.channel.alternatives[0].transcript;

      if (thisCaption !== "") {
        console.log('thisCaption !== ""', thisCaption);
        thisCaption += caption + thisCaption;
        setCaption(thisCaption);
          // Append the new text to the previous texts
        setTranscribedTexts((prevTexts) => [...prevTexts, thisCaption]);
      }

      if (isFinal && speechFinal) {
        clearTimeout(captionTimeout.current);
        captionTimeout.current = setTimeout(() => {
          console.log("stop");
          // disconnectFromDeepgram();
          clearTimeout(captionTimeout.current);
        }, 3000);
      }
    };

    if (connectionState === LiveConnectionState.OPEN) {
      connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);
      startMicrophone();
    }

    return () => {
      // prettier-ignore
      connection.removeListener(LiveTranscriptionEvents.Transcript, onTranscript);
      microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
      clearTimeout(captionTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionState]);

  useEffect(() => {
    if (!connection) return;

    if (
      microphoneState !== MicrophoneState.Open &&
      connectionState === LiveConnectionState.OPEN
    ) {
      connection.keepAlive();

      keepAliveInterval.current = setInterval(() => {
        connection.keepAlive();
      }, 50000);
    } else {
      console.log("clearInterval");
      setCaption("");
      clearInterval(keepAliveInterval.current);
    }

    return () => {
      clearInterval(keepAliveInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [microphoneState, connectionState]);
  const disconnect = () => {
    disconnectFromDeepgram();
    transcribedTexts
    
  }
  return (
      <div className="flex h-full">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full">
            <div className="relative w-full h-full">
              {/* {microphone && <Visualizer microphone={microphone} />} */}
              <div className=" max-w-4xl mx-auto text-center">
                {/* <button>startRecord</button> */}
                <button onClick={disconnect}>send</button> 
                {/* {"currentCaption: " + transcribedTexts} */}
                
              </div>
              {/* <div className="mt-80 p-4 text-center">
              {caption && <span className="bg-black/70 p-8">{caption}</span>}
              </div> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;