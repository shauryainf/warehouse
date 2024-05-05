"use client";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

interface QAPair {
  role: "user" | "system";
  content: string;
}

export function VestGPT() {
  const [question, setQuestion] = useState<string>("");
  const [qaPairs, setQAPairs] = useState<QAPair[]>([]);

  const url = "https://warehouse-server.azurewebsites.net/api/query"
  const query = async () => {
    try {
      setQuestion("");
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "query": question,
            "previous_messages":
              qaPairs

          }
        ), // The URL you want to scrape
      });

      setQAPairs((prevPairs) => [
        ...prevPairs,
        { role: "user", content: question },
      ]);

      const data = await response.json();

      setQAPairs((prevPairs) => [
        ...prevPairs,
        { role: "system", content: data?.response },
      ]);

      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
      alert('Scraping failed. Check the console for details.');
    }
  };

  return (

    <div className="lg:min-w-[230%] w-96 lg:max-w-[50%] max-h-[734px] lg:max-h-[800px] overflow-y-auto lg:ml-[-70%]">
      <div className="m-2 sm:max-w-[100%] lg:max-w-[100%] ">
        <div className="w-[100%] mt-2  chatstyle rounded-md ">
          <div className="mb-4">
            <button className="text-black bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black rounded-lg border border-gray-100                                                                                                                                               w-[24%] lg:ml-1 h-12  ">START</button>
            <button className="text-black bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1  h-12  border border-gray-100 rounded-lg">STOP</button>
            <button className="text-black bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1   h-12 border border-gray-100 rounded-lg">UPDATE</button>
            <button className="text-black bg-white hover:backdrop-filter hover:backdrop-blur-md hover:bg-opacity-70 hover:border-black hover:text-black w-[24%] lg:ml-2 ml-1  h-12  border border-gray-100 rounded-lg">FIND</button>
          </div>
          <hr className="h-[2px] bg-white" />
          <hr />
        </div>
      </div>
      <div className="p-2 flex flex-col sm:max-w-[100%] lg:max-w-[100%] w-[100%]">
        <div className="flex">
          <div className="shrink-0">
            <img src="/ai.png" alt="Seidor AI Image" className="mr-2 w-6 h-6 mt-1" />
          </div>
          <div className="flex chatstyle w-[75%]">
            <div className="ml-2 p-1 col-span-11 text-base text-white flex items-center">
              Hello, how can I assist you today?
            </div>
          </div>
                  </div>
        <style jsx>{`
          .chatstyle {
            background: black;
            box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.37);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 0px 8px 8px 8px;
            border: 1px solid rgba(255, 255, 255, 0.68);
          }
          .chatstyleuser {
            background: #111827;
            box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.37);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 8px 0px 8px 8px;
            border: 1px solid rgba(255, 255, 255, 0.68);
            color: white;
          }
         

        `}</style>

        <div className="flex flex-col pt-2 space-y-2 overflow-y-auto  ">
          {qaPairs.map((pair, index) => (
            <div key={index} className="flex gap-2 flex-col overflow-y-auto">
              {pair.role === "user" &&
              <div className="flex  mt-3">
                <div className="text-sm flex items-center chatstyleuser w-[75%] ml-[25%]">
                  
                  <div className="col-span-11 w-auto">
                    <p className="text-inherit text-base ml-2 p-1">{pair.content}</p>
                  </div>
                </div>
                <img
                  src="https://cdn3d.iconscout.com/3d/free/thumb/free-user-3814118-3187499.png?f=webp"
                  className="w-10 h-10"
                />
                </div>}

              {pair.role === "system" &&

                <div className="flex">

                  <div className="shrink-0">
                    <img
                    src="/ai.png"
                    alt="Seidor AI Image"
                    className="w-6 h-6 mt-1 mr-2"
                  />
                  </div>
                <div className="text-sm flex items-center chatstyle w-[75%]">
                  <div className="ml-2 p-1 text-base col-span-11">{pair.content}</div>
                </div>
                </div>}
            </div>
          ))}
        </div>
        <div>
        </div>
      </div>

      {/* <div className="bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-70 border border-white
             h-20 flex w-32 py-2 absolute bottom-16 rounded-md mx-2 ">
        <img src="https://icons.iconarchive.com/icons/michael/coke-pepsi/512/Coca-Cola-Can-icon.png" alt="" />
        <span className="flex items-center text-sm"><strong>COKE</strong></span>
      </div> */}


      <div className="w-full ml-2 flex gap-x-2 absolute bottom-4 sm:max-w-[320px] lg:min-w-[68%]">
        <Input
          className="bg-[#fafafa] w-[75%] lg:max-w-[63%] text-black"
          placeholder="Type your questions here..."
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setQuestion("");
            }
          }}
          value={question}
        />
        <Button
          className="bg-black text-white hover:bg-slate-200 hover:text-black"
          type="submit"
          onClick={() => {
            query();
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
