"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface QAPair {
  question: string;
  answer: string;
}

export function VestGPT() {
  const [question, setQuestion] = useState<string>("");
  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);
  let qaPairs2: QAPair[] = [
    {
      question: "What is ESG investing?",
      answer: "ESG investing is something",
    },
    // Add more pairs here as needed
  ];
  const query = async () => {
    try {
      setQAPairs((prevPairs) => [
        ...prevPairs,
        { question: question, answer: "" },
      ]);
      const response = await fetch("/api/llm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
        }),
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setQAPairs((prevPairs) => [
          ...prevPairs.slice(0, -1),
          { question: question, answer: data.response },
        ]);
        // qaPairs.push({ question: question, answer: data.response })
        qaPairs2.push({
          question: "What is ESG investing?",
          answer: "ESG investing is something",
        });

        setQuestion("");
        console.log(data);
        console.log(qaPairs);
      } else {
        // Handle error response
        console.error("Error:", response.status);
      }
    } catch (error) {
      // Handle network error
      console.error("Error:", error);
    }
  };

  return (
  
    <div className="lg:min-w-[230%] w-96 lg:max-w-[50%] max-h-[760px] lg:max-h-[810px] overflow-y-auto lg:ml-[-70%]">
      <div className="m-2 sm:max-w-[100%] lg:max-w-[100%] ">
        
        <div className="w-[100%] mt-2  chatstyle rounded-md ">
            {/* 
                
                Update 
                List 
                Find (3)
            */}
            <div className="mb-4">
                <button className="  hover:bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black rounded-md bg-clip-padding bg-opacity-20 border border-gray-100
                                                                                                                                                             w-[24%] lg:ml-1 h-12  ">START</button>
                <button className="hover:bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1  h-12  border border-gray-100 rounded-md">STOP</button>
                <button className="hover:bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1   h-12 border border-gray-100 rounded-md">UPDATE</button>
                <button className="hover:bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1  h-12  border border-gray-100 rounded-md">FIND</button>
            </div>
            <hr />
            
      </div>
      </div>

      <div
        className="p-2
 flex flex-col sm:max-w-[100%] lg:max-w-[100%] w-[100%] "
      > <div className="flex chatstyle w-[75%]">
      <div className="shrink-0">
        <img src="/ai.png" alt="ESG Image" width={40} height={40} />
      </div>
      <div className="col-span-11 text-sm flex items-center">Hello, how can I assist you today?</div>
    </div>
        <style jsx>{`
          .chatstyle {
            background: rgba(255, 255, 255, 0.35);
            box-shadow: 0 2px 8px 0 rgba(255, 255, 255, 0.37);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.78);
          }
          .chatstyleuser {
            background: rgba(0, 0, 0, 0.6);
            box-shadow: 0 2px 8px 0 rgba(255, 255, 255, 0.37);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.78);
            color: white;
          }
         

        `}</style>

        <div className="flex flex-col pt-2 space-y-2 overflow-y-auto  ">
          {qaPairs.map((pair, index) => (
            <div key={index} className="flex gap-2 flex-col overflow-y-auto">
              <div className="text-sm flex items-center chatstyleuser w-[75%] ml-[25%]">
                <div className="shrink-0">
                  <img
                    className="w-10"
                    src="https://cdn3d.iconscout.com/3d/free/thumb/free-user-3814118-3187499.png?f=webp"
                    alt="ESG Image"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="col-span-11 mt-1">
                  <p className="text-inherit">{pair.question}</p>
                </div>
              </div>
              <div className="text-sm flex items-center chatstyle w-[75%]">
                <div className="shrink-0">
                  <img src="/ai.png" alt="ESG Image" width={40} height={40} />
                </div>
                <div className="col-span-11">{pair.answer}</div>
              </div>
            </div>
          ))}
          </div>

          <div></div>
        </div>
      
    
      <div className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-white
 h-20 flex w-32 py-2 absolute bottom-16 rounded-md mx-2 ">
        <img src="https://icons.iconarchive.com/icons/michael/coke-pepsi/512/Coca-Cola-Can-icon.png" alt="" />
        <span className="flex items-center text-sm"><strong>COKE</strong></span>
      </div>
      

      <div className="w-full ml-2 flex gap-x-2 absolute bottom-4 sm:max-w-[320px] lg:min-w-[68%]">
        <Input
          className="bg-[#fafafa] w-[75%] lg:max-w-[63%]"
          placeholder="Type your questions here..."
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              query();
              setQuestion("");
            }
          }}
          value={question}
        />
        <Button
          className="bg-black "
          type="submit"
          onClick={(e) => {
            query();
            setQuestion("");
          }}
          disabled={question === ""}
        >
          {" "}
          Ask
        </Button>
      </div>
    </div>
    
  );
}
