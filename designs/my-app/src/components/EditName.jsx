import React, { useState } from 'react';
import "./EditName.css";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { setEditUser } from '../redux/Reducers/ProfileUserReducer';
import { useEditUserMutation } from '../service/apiSlice';

const EditName = ({onClose, showEditName}) => {
    const dataUser = useSelector((state) => state.profile);
    const token = useSelector((state) => state.auth.token);
    const [userName, setUserName] = useState(dataUser.userName);
    const dispatch = useDispatch();
    const [editUser] = useEditUserMutation();
    
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const user = {
            token: token,
            userName: userName
        };
        
        try {       
            const response = await editUser(user).unwrap();
            dispatch(setEditUser(response.body.userName));
        } catch (error) {
            console.error("Error updating user name:", error);
        }
        return onClose();
    };

    return (
        <div className={`edit-name-wrapper ${showEditName ? '' : 'hidden'}`}>
            <div className="edit-name-container">
                <h3>Edit User Info</h3>
                <form onSubmit={handleSaveChanges}>
                <div className="input-wrap">
                <label htmlFor="userName">User Name</label>
                <input
                    id ="useName"
                    type="text"
                    placeholder={userName}
                    onChange={(e) => setUserName(e.target.value)}
                /></div>
                <div className="input-wrap">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={`${dataUser.firstName}`}
                    disabled
                /></div>
                <div className="input-wrap">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={`${dataUser.lastName}`}
                    disabled
                /></div>
                <div className="button-group">
                    <button className="save-button" onClick={handleSaveChanges}>Save</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
        
    );
};

export default EditName;