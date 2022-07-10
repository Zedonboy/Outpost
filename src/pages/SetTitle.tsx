import Button from "../components/Button";
import { SearchIcon } from "@heroicons/react/outline";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { useEffect, useRef } from "react";

export default function SetTitle() {
  //@ts-ignore
  let connectorRef = useRef<WalletConnect | null>(null)
  useEffect(() => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    connectorRef.current = connector
  }, []);
  return (
    <main className="">
      <nav className="flex md:px-32 px-4 fixed w-full top-0 left-0 right-0 justify-between p-1 items-center">
        <div>Logo</div>
        <div>
          <div className="mt-1  relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-indigo-500 bg-white bg-opacity-10 placeholder:text-gray-400 text-gray-400 outline-none block w-full pl-10 sm:text-sm border-gray-500 rounded-md"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <Button>
            Save
          </Button>
        </div>
      </nav>

      <div className="flex flex-col min-h-screen justify-center items-center">
        <label
          htmlFor="file-input"
          className="relative cursor-pointer flex flex-col items-center bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <span>Add Cover Image*</span>
          <input
            id="file-input"
            accept=".jpg, .png"
            name="file-upload"
            type="file"
            className="sr-only"
          />
        </label>
        <input
          placeholder="Type Title"
          className="outline-none text-center mt-2 bg-transparent text-5xl font-light"
        />
        <div className="mt-4">
          <Button onClick={(e : any) => {
            if(connectorRef.current?.connected){
              connectorRef.current.createSession()
            }
          }}>Mint</Button>
        </div>
      </div>
    </main>
  );
}
