import { useState } from 'react'
import { generateMnemonic } from 'bip39';
import { SolanaWallet } from './components/SolanaWallet';
import { EthWallet } from './components/EthereumWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div className='h-[100dvh] w-[100dvw] bg-black text-white flex flex-col items-center justify-center'>
        <div className='flex space-x-5 items-center m-5'>
          {mnemonic && <p className='text-xl border-2 rounded-lg p-1'>{mnemonic}</p>}
          <button onClick={async function () {
            const mn = await generateMnemonic();
            setMnemonic(mn);
          }}
            className='bg-cyan-600 px-2 py-1 rounded-md hover:bg-cyan-200 hover:text-black'
          >
            Create Seed Phrase
          </button>

        </div>
        <div className='flex justify-around w-[75dvw]'>
          <SolanaWallet mnemonic={mnemonic} />

          <EthWallet mnemonic={mnemonic} />
        </div>

      </div>
    </>
  )
}

export default App
