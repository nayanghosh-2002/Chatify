import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;

            try {
                const res = await axios.get(`${BASE_URL}/api/v1/message/${selectedUser._id}`, {
                    withCredentials: true
                });
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
