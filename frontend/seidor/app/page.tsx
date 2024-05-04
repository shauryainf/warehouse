"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VestGPT } from "@/components/home/gpt";
import Image from "next/image";
export default function Home() {
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

    </header>

      <div className="m-2 inline-block mx-auto">
        <VestGPT />
      </div>
    </div>

  );
}
