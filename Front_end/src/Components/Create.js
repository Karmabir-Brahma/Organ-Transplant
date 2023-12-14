import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import { createEthereumContract } from "../Utils/Constants";

function Create() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dept, setDept] = useState("");
    const [posi, setPosi] = useState("");
    const [formFilled, setFormFilled] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function Check() {
            const transactionContract = createEthereumContract();
            const cid = await transactionContract.getCid(localStorage.getItem("address"));
            if (cid) {
                setFormFilled(true);
            }
            else {
                setFormFilled(false);
            }
        }
        Check();
    }, [])


    function getAccessToken() {
        return process.env.WEB3STORAGE_TOKEN
    }

    function makeStorageClient() {
        return new Web3Storage({ token: getAccessToken() })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const address = localStorage.getItem("address");
        const data = {
            name: name,
            email: email,
            department: dept,
            position: posi,
            address: address
        }

        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const files = [new File([blob], 'info.json')]

        try {
            if (window.ethereum) {
                //Adding user details into IPFS
                const client = makeStorageClient();
                const cid = await client.put(files);
                console.log("CID is", cid);

                //Adding cid to Blockchain
                const transactionsContract = createEthereumContract();
                const transactionHash = await transactionsContract.setCid(address, cid);
                await transactionHash.wait();
                console.log("Transaction has:", transactionHash.hash);
                window.localStorage.setItem("trx_hash", transactionHash.hash);
                navigate("/User");
            }
            else {
                console.log("NO WALLET FOUND");
            }
        } catch (error) {
            console.log("Error is:", error);
        }
    }

    function handleClick(event) {
        event.preventDefault();
        navigate("/User");
    }

    const formView = (
        <>
            <div className="modal_wrapper_2">
                <div className="modal_container_2">
                    <strong>Fill up the below form</strong>
                    <form className="form_style" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name*:</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email*:</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department*:</label>
                            <input type="text" className="form-control" value={dept} onChange={(e) => setDept(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Position*:</label>
                            <input type="text" className="form-control" value={posi} onChange={(e) => setPosi(e.target.value)} required />
                        </div>
                        <div className="form_submit">
                            <input className="cntr" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    const filledView = (
        <>
            <div className="modal_wrapper_3" />
            <div className="modal_container_3">
                <p>You have already filled this form so, you can't fill it anymore</p>
                <div className="cntr">
                    <button onClick={handleClick}>Okay</button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {formFilled ? filledView : formView}
        </>
    )
}

export default Create;