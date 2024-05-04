"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VestGPT } from "@/components/home/gpt";
import Image from "next/image";

export default function Home() {
  function myFunction() {
    console.log("Hello World")
    //navigator.bluetooth.requestDevice({acceptAllDevices: true})
    
      try {
        const device = navigator.bluetooth.requestDevice({
          acceptAllDevices: true
        });
        const connection = device.connect();
        if (connection) {
          console.log("Device is connected!");
        } else {
          console.log("Connection failed or cancelled by user.");
        }
      } catch (error) {
        console.error("Error connecting to device:", error);
      }
    
    
  }
  return (
    <div className="flex flex-col h-screen home ">
      
      <style jsx>{`
            .home {
              background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
          `}</style>
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-medium">SEIDOR AI</h1>
      </div>
      <button onClick={myFunction}><img width={30} src="https://static-00.iconduck.com/assets.00/bluetooth-icon-2048x2048-7i2pzxl7.png" alt="" /></button>

    </header>
          

      <div className="m-2 inline-block mx-auto">
        <VestGPT />
      </div>
    </div>

  );
}