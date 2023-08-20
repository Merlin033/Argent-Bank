import React from 'react';
import Account from '../components/Account';
import "./Profilepage.css"
import { useSelector} from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditName from '../components/EditName';

const Profilpage = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)
    const dataUser = useSelector((state) => state.profile);
    const [showEditName, setShowEditName] = useState(false);

    useEffect(() => {
        if (!token) {
          navigate("/login");
        }
      }, [token, navigate]);

    const handleEditName = () => {
        setShowEditName(!showEditName);
    };
    
    return (
        <main className='main bg-dark'>
           {!showEditName && <div className="header">
                <h1>Welcome back<br />{`${dataUser?.firstName} ${dataUser?.lastName}`}</h1>
                <button className="edit-button" onClick={handleEditName}>Edit Name</button>
            </div>}
      {showEditName && <EditName 
                        onClose={handleEditName}
                        showEditName={showEditName}/>}
            <h2 className="sr-only">Accounts</h2>
            <Account state={{ accountNumber: "Argent Bank Checking (x8349)", balance: "$2,082.79", status: "Available Balance" }} />
            <Account state={{ accountNumber: "Argent Bank Savings (x6712)", balance: "$10,928.42", status: "Available Balance" }} />
            <Account state={{ accountNumber: "Argent Bank Credit Card (x8349)", balance: "$184.30", status: "Current Balance" }} />
        </main>
    );
};

export default Profilpage;