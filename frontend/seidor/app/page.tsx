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
              background: rgb(238,174,202);
background: -moz-radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(229,240,241,1) 79%);
background: -webkit-radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(229,240,241,1) 79%);
background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(229,240,241,1) 79%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#eeaeca",endColorstr="#e5f0f1",GradientType=1);
          
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
