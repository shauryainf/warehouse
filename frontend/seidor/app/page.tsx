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
        })
        .then(device => {
          console.log('Got device:', device.name);
          // Human-readable name of the device.
        
        return device.gatt?.connect();
        }
      );
      

    
        
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
        <h1 className="text-lg font-medium"><img width={120} src="https://cl.seidor.com/hs-fs/hubfs/LOGO_NEGATIVO_BN.png?width=300&height=140&name=LOGO_NEGATIVO_BN.png" alt="" /></h1>
      </div>
      <div className="w-2.5 h-2.5 bg-red-700 rounded-full right-16 mr-4 absolute"></div>
      <button onClick={myFunction}><img width={50} src="https://static-00.iconduck.com/assets.00/bluetooth-icon-2048x2048-7i2pzxl7.png" alt="" /></button>

    </header>
          

      <div className="m-2 inline-block mx-auto">
        <VestGPT />
      </div>
    </div>

  );
}
