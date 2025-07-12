import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import { IoArrowBackOutline } from "react-icons/io5";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    
    const deselectUser = () => {
        dispatch(setSelectedUser(null));
    };
   
    return (
        
        <div className={`md:min-w-[550px] flex flex-col w-full h-full ${selectedUser ? 'flex' : 'hidden sm:flex-1'}`}>
            {
                selectedUser !== null ? (
                    <div className='flex flex-col w-full h-full'> 
                        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            
                            <button onClick={deselectUser} className="sm:hidden text-white mr-2 p-1 rounded-full hover:bg-zinc-700 transition-colors">
                                <IoArrowBackOutline size={24} />
                            </button>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    
                    <div className='flex flex-col justify-center items-center w-full h-full'>
                        <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
                        <h1 className='text-2xl text-white'>Let's start conversation</h1>
                    </div>
                )
            }
        </div>
    );
};

export default MessageContainer;
