import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Helper/Modal";

function Home() {
    const [account, setAccount] = useState();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    async function initilizeWeb3() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                window.localStorage.setItem("address", accounts[0]);
                navigate("/User");
            }
            catch (error) {
                console.log("User denied to connect");
            }
        }
        else {
            setShowModal(true);
            console.log("Wallet not detected");
        }
    }

    const closeModal = () => setShowModal(false);

    const walletConnet = (
        <div>
            {account ? <div>Wallet Connected</div> : <div>Connect Wallet</div>}
        </div>
    );

    return (
        <>
            <div>
                <div className="cntr">
                    <h1>Welcome to MPA</h1>
                    <button type="button" className="btn btn-primary" onClick={initilizeWeb3}>{walletConnet}</button>
                    {showModal && <Modal closeModal={closeModal} />}
                </div>
            </div>
        </>
    )
}

export default Home;