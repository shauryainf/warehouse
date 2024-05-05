import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

export const RecordView = () => {
    
  const [mediaBlob, setMediaBlob] = useState("");
  const [fileName, setFileName] = useState('');
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ audio: true , video: false, onStop: (blobUrl) => {
            // This callback is called when recording stops.
            setMediaBlob(blobUrl);
          }});
        
          const handleStartRecording = () => {
            startRecording();
          };
        
          const handleStopRecording = () => {
            stopRecording();
            saveFileLocally();
          };
        
          const saveFileLocally = () => {
            if (mediaBlob) {
              const now = new Date();
              const filename = `recording_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.webm`;
              setFileName(filename);
        
              // Here you can save the mediaBlob locally using browser APIs like File or Blob.
              // For simplicity, let's assume you're just updating state with the mediaBlob.
              // In reality, you would save it to a file using appropriate APIs.
            }
          };
        
    return (
        <div>
        <button onClick={handleStartRecording} disabled={status === 'recording'}>
          Start Recording
        </button>
        <button onClick={handleStopRecording} disabled={status !== 'recording'}>
          Stop Recording
        </button>
        <div>Status: {status}</div>
        {mediaBlob && (
          <div>
            <div>Recorded File: {fileName}</div>
            <audio controls src={mediaBlob}></audio>
          </div>
        )}
      </div>
    );
};