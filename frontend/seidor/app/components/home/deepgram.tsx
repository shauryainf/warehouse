// Example filename: index.js

import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import fetch from "cross-fetch";
import dotenv from "dotenv";
dotenv.config();

// URL for the realtime streaming audio you would like to transcribe
const url = "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service";

const live = async () => {
    // STEP 1: Create a Deepgram client using the API key
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY ?? '');

    // STEP 2: Create a live transcription connection
    const connection = deepgram.listen.live({
        model: "nova-2",
        language: "en-US",
        smart_format: true,
    });

    // STEP 3: Listen for events from the live transcription connection
    connection.on(LiveTranscriptionEvents.Open, async () => {
        connection.on(LiveTranscriptionEvents.Close, () => {
            console.log("Connection closed.");
        });

        connection.on(LiveTranscriptionEvents.Transcript, (data) => {
            console.log(data.channel.alternatives[0].transcript);
        });

        connection.on(LiveTranscriptionEvents.Metadata, (data) => {
            console.log(data);
        });

        connection.on(LiveTranscriptionEvents.Error, (err) => {
            console.error(err);
        });

        // STEP 4: Fetch the audio stream and send it to the live transcription connection

        const response = await fetch(url);

        // Get the response body as a ReadableStream
        const body = response.body;

        if (!body) {
            throw new Error('Response body is empty.');
        }

        // Create a StreamReader
        const reader = body.getReader();

        // Continuously read data from the stream and send it to the connection
        const readData = async () => {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                connection.send(value);
            }
        };

        // Start reading data from the stream
        readData();

        // fetch(url)
        //   .then((r) => r.body)
        //   .then((res) => {
        //     res?.on("readable", () => {
        //       connection.send(res.read());
        //     });
        //   });
    });
};

live();
