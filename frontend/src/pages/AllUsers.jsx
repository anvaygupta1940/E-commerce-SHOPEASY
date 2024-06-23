import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from "react-toastify";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [openUpdateRoleBox, setOpenUpdateRoleBox] = useState(false);
    const [updatingUserDetails, setUpdatingUserDetails] = useState({
        email: "",
        role: "",
        name: "",
        id: ""
    });

    const fetchAllUsers = async () => {
        const res = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: "include"
        });

        const result = await res.json();
        // console.log(result);

        if (result.success) {
            setAllUsers(result.data);
        }
        if (result.error) {
            toast.error(result.message)
        }
    }
    useEffect(() => {
        fetchAllUsers();
    }, []);
    return (
        <div className=' bg-white pb-4'>
            <table className=' w-full userTable'>
                <thead>
                    <tr className=' bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>{moment(item.createdAt).format('LL')}</td>
                                    <td>
                                        <button className=' bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'
                                            onClick={() => {
                                                setOpenUpdateRoleBox(true);
                                                setUpdatingUserDetails({
                                                    name: item.name,
                                                    email: item.email,
                                                    role: item.role,
                                                    id: item._id
                                                });
                                            }}>
                                            <EditIcon></EditIcon>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateRoleBox &&
                (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRoleBox(false)}
                        name={updatingUserDetails.name}
                        email={updatingUserDetails.email}
                        role={updatingUserDetails.role}
                        userId={updatingUserDetails.id}
                        callFunc={fetchAllUsers}>
                    </ChangeUserRole>
                )
            }
        </div>
    )
}

export default AllUsers
