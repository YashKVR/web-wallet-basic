/* eslint-disable react/prop-types */
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div className="text-center">
            <p className="text-2xl font-semibold">ETH Wallets</p>
            <button onClick={async function () {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const child = hdNode.derivePath(derivationPath);
                const privateKey = child.privateKey;
                const wallet = new Wallet(privateKey);
                setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, wallet.address]);
            }}
                className='bg-cyan-600 px-2 py-1 rounded-md hover:bg-cyan-200 hover:text-black'
            >
                Add ETH wallet
            </button>

            {addresses.map(p => <p key={p.id}>
                {p}
            </p>)}
        </div>
    )
}