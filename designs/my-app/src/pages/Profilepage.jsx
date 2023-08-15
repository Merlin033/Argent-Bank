import React from 'react';
import Account from '../components/Account';
import "./Profilepage.css"

const Profilpage = () => {
    return (
        <main className='main bg-dark'>
            <header>Welcome</header>
            <h2 className="sr-only">Accounts</h2>
            <Account state={{ accountNumber: "Argent Bank Checking (x8349)", balance: "$2,082.79", status: "Available Balance" }} />
            <Account state={{ accountNumber: "Argent Bank Savings (x6712)", balance: "$10,928.42", status: "Available Balance" }} />
            <Account state={{ accountNumber: "Argent Bank Credit Card (x8349)", balance: "$184.30", status: "Current Balance" }} />
        </main>
    );
};

export default Profilpage;