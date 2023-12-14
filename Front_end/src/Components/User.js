import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEthereumContract } from "../Utils/Constants";

function User() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [department, setDepartment] = useState();
    const [position, setPosition] = useState();
    const [address, setAddress] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            const transactionsContract = createEthereumContract();
            const data = await transactionsContract.getCid(localStorage.getItem("address"));
            if (data) {
                try {
                    const response = await fetch(`https://${data}.ipfs.dweb.link/info.json`);
                    const res = await response.json();
                    setName(res.name);
                    setEmail(res.email);
                    setDepartment(res.department);
                    setPosition(res.position);
                    setAddress(res.address);
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log("No data was found");
                navigate("/Create");
            }
        }
        getUserData();
    }, []);
    return (
        <>
            <div className="user_box">
                <h6>This is user with address {address}</h6>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Department: {department}</p>
                <p>Position: {position}</p>
            </div>
            <br />
            <div className="user_box">
                <h6>List of authenticators:</h6>

            </div>
        </>
    )
}

export default User;