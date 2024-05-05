import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
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
    <div>
        <div>Microphone: {listening ? 'on' : 'off'}</div>
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => SpeechRecognition.startListening()}>Start</button>
        <button onClick={() =>  console.log(finalTranscript)}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <div>{transcript}</div>
    </div>
);
};
export default Dictaphone;