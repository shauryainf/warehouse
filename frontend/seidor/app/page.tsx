"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VestGPT } from "@/components/home/gpt";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col h-screen">
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-lg font-medium">AI Chatbot</h1>
      </div>
      <Button className="rounded-full" size="icon" variant="ghost">
        <span className="sr-only">Open settings</span>
      </Button>
    </header>
    <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center">
        <Input className="flex-1 mr-4" placeholder="Type your message..." type="text" />
        <Button>Send</Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <VestGPT />
      </div>
    </div>

  );
}
