import {SearchIcon} from "@heroicons/react/outline"
import Button from "../components/Button"
import AltBtn from "../components/Altbutton.jsx"
import herobg from "../assets/images/heroimage.png"
export default function Home() {
    return (
        <main className="bg-gradient-to-r px-4 md:px-32 from-[#984D38] to-[#181E41]">
    <nav className="flex md:px-32 px-4 fixed w-full top-0 left-0 right-0 justify-between p-1 items-center">
      <div>Logo</div>
      <div>
      <div className="mt-1  relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="focus:ring-indigo-500 bg-white bg-opacity-10 placeholder:text-gray-400 text-gray-400 outline-none block w-full pl-10 sm:text-sm border-transparent rounded-md"
          placeholder="you@example.com"
        />
      </div>
      </div>
      <div>
        <Button>Select Wallet</Button>
      </div>
    </nav>

    <section className='w-full h-screen flex items-center'>
      <section className='grid md:grid-cols-2 items-center grid-cols-1 gap-12'>
        <div>
        <h1 className="text-white text-5xl leading-[60px] text-left font-bold">
          Create, Sell & Collect Your Own Creative NFT
          </h1>
          <p className='text-gray-400 text-xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit.
          </p>
          <div className='flex mt-4 space-x-4'>
          <Button>Create Stack</Button>
          <AltBtn>Explore Stacks</AltBtn>
          </div>
        </div>
        <div className='flex'>
          <img src={herobg} className="w-full"></img>
        </div>
      </section>
    </section>
   </main>
    )
}