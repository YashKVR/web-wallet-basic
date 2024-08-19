/* eslint-disable react/prop-types */
import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

    return <div className="text-center">
        <p className="text-2xl font-semibold">Solana Wallets</p>
        <button onClick={function () {
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
            className='bg-cyan-600 px-2 py-1 rounded-md hover:bg-cyan-200 hover:text-black'
        >
            Add Sol wallet
        </button>
        {publicKeys.map(p => <p key={p.id}>
            {p.toBase58()}
        </p>)}
    </div>
}