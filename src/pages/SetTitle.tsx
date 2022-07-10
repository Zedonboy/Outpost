import Button from "../components/Button";
import { SearchIcon } from "@heroicons/react/outline";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import algosdk from "algosdk";
import { formatJsonRpcRequest } from "@json-rpc-tools/utils";
import { useEffect, useRef, useState } from "react";
const baseServer = "https://testnet-algorand.api.purestake.io/ps2";
const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlDQjAwMTIxNDFDNDQwODNjNTA0MmM1M0FGZDlENTExQjI4MzUwN2IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NzQ1NzMyNzQyOSwibmFtZSI6Ik9VVFBPU1RfQVBQX0FQSV9LRVkifQ.rTsLmh0VqSTRsUiwyrSz7Xtm48gJYC1StjLBYX1wwvg";
import { NFTStorage } from "nft.storage";
import { useRecoilValue } from "recoil";
import { EditorStateAtom } from "../../atoms/editor";
const port = "";
const token = {
  "X-API-Key": "OGKyWzuveD7K0pEzegBu12PMwLe7SfV154aBTF8o",
};

export default function SetTitle() {
  //@ts-ignore
  let connectorRef = useRef<WalletConnect | null>(null);
  let editorData = useRecoilValue(EditorStateAtom);
  let [title, setTitle] = useState("");
  let [imageSrc, setImageSrc] = useState<any>("");
  let [loading, setLoading] = useState<any>();
  // let [step, setStep] = useState("")
  let assetUrl = "";
  useEffect(() => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    connector.on("connect", (err, payload) => {
      if (err) throw err;

      setLoading("Checking Eligibility");
      const { accounts } = payload.params[0];
      let addr = accounts[0];
      const algodClient = new algosdk.Algodv2(token, baseServer, port);
      //@ts-ignore
      const nftClient = new NFTStorage({ token: NFT_STORAGE_TOKEN });

      (async () => {
        let params = await algodClient.getTransactionParams().do();
        let accountInfo = await algodClient.accountInformation(addr).do();
        if (accountInfo.amount > params.fee) {
          //@ts-ignore
          let blob = new Blob([editorData]);
          setLoading("Uploading Content");
          let cid = await nftClient.storeBlob(blob);
          let metadata = await nftClient.store({
            //@ts-ignore
            cover: imageSrc,
            title,
            content: cid,
          });
          let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: addr,
            total: 1,
            decimals: 0,
            assetName: title,
            //@ts-ignore
            assetURL: metadata.embed(),
            suggestedParams: params,
            defaultFrozen: false,
          });

          const txns = [txn];
          const txnsToSign = txns.map((txn) => {
            //@ts-ignore
            const encodedTxn = Buffer.from(
              algosdk.encodeUnsignedTransaction(txn)
            ).toString("base64");

            return {
              txn: encodedTxn,
              message: "Transaction to mint",
              // Note: if the transaction does not need to be signed (because it's part of an atomic group
              // that will be signed by another party), specify an empty singers array like so:
              // signers: [],
            };
          });

          const requestParams = [txnsToSign];

          const request = formatJsonRpcRequest("algo_signTxn", requestParams);
          setLoading("Creating NFT");
          const result: Array<string | null> =
            await connector.sendCustomRequest(request);
          setLoading("NFT Created, Check your Wallet");
        } else {
          setLoading(undefined);
          // show a message.
        }
      })().catch((err) => {
        setLoading(undefined);
      });
    });

    document.getElementById("file-input")?.addEventListener("change", (ev) => {
      //@ts-ignore
      let file = ev.target.files[0];
      if (file) {
        let fr = new FileReader();
        fr.onload = (ev) => {
          setImageSrc(fr.result);
        };
        fr.readAsDataURL(file);
      }
    });

    connectorRef.current = connector;
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
          <Button>Save</Button>
        </div>
      </nav>

      <div className="flex flex-col min-h-screen justify-center items-center">
        <figure className="max-h-80 max-w-[20rem] rounded-md overflow-clip"></figure>
        {imageSrc ? (
          <img className="w-full object-cover" src={imageSrc}></img>
        ) : (
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
        )}

        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Type Title"
          className="outline-none text-center mt-2 bg-transparent text-5xl font-light"
        />
        {loading ? (
          <>
            <div
              className="
          spinner-border
          animate-spin
          inline-block
          w-8
          h-8
          border-4
          rounded-full
          text-purple-500
        "
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <div>{loading}</div>
          </>
        ) : (
          <div className="mt-4">
            <Button
              onClick={(e: any) => {
                setLoading("Checking Legibility");
                if (!connectorRef.current?.connected) {
                  connectorRef.current?.createSession();
                }
              }}
            >
              Mint
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
