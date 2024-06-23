import React, { useState } from 'react'
import ROLE from "../common/role";
import CloseIcon from '@mui/icons-material/Close';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {
    const [userRole, setUserRole] = useState(role);

    // changing user role on click
    const changeUserRole = async () => {
        const res = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        });

        const result = await res.json();
        if (result.success) {
            toast.success(result.message);
            onClose();
            callFunc();
        }
        // console.log("Updated user data >>>", result);

    }
    // handling change in select tag
    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        // console.log("Cuurent role >> ", e.target.value);
    }
    return (
        <div className=' fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-slate-200 bg-opacity-60'>

            <div className=' h-fit w-full max-w-sm bg-white shadow-md p-4'>

                <button className=' block ml-auto ' onClick={onClose}>
                    <CloseIcon></CloseIcon>
                </button>
                <h1 className=' pb-4 text-lg font-semibold'>Change User Role</h1>

                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className=' flex items-center justify-between my-4'>
                    <p>Role :</p>
                    <select className=' border px-4 py-1' value={userRole} onChange={(e) => handleOnChangeSelect(e)}>
                        {Object.values(ROLE).map((el) => {
                            return (
                                <option value={el} key={el}>{el}</option>
                            )
                        })}
                    </select>
                </div>
                <button className=' w-fit mx-auto block py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700' onClick={changeUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default ChangeUserRole
