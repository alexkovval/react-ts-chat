import React, { FC, useEffect, useState } from 'react';
import styles from './Chat.module.css';
import socket from '../../socket/socket';
import {IUser} from '../../models/User';
import {IMessage} from '../../models/Message';
import ReactScrollToBottom from '@benarnold/react-scroll-to-bottom';

interface ChatProps {
    user:IUser,
    roomId: string,
    messageList:IMessage[],
    setMessageList:Function
}
export const Chat:FC<ChatProps> = ({ user, roomId, messageList, setMessageList}) => {
    const [value, setValue] = useState('');
 
    useEffect(():any => {
        socket.on('receive_message', (message) => {
            setMessageList((list:any) => [...list, message]);
        });
        return () => socket.disconnect();
    }, [socket]);

    const sendMessage = async (e:React.ChangeEvent<HTMLButtonElement>) => {
        console.log(user.username);
        e.preventDefault();
        const NewMessage:IMessage = {
            //???? it's ok?
            username: user.username || '',
            message: value,
            roomId
        };
        await socket.emit('newMessage', NewMessage);
        setValue('');
    };

    return (
        <div className='chat'>
            <div className='createMessage'>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className={styles.msgButton} onClick={() => sendMessage}>
                    Send
                </button>
            </div>
            <ReactScrollToBottom className={styles.messages}>
                {messageList.map((message:IMessage) => (
                    <div className={styles.oneMessage} key={message._id}>
                        {message.username}: {message.message} 
                    </div>
                ))}
            </ReactScrollToBottom>
        </div>
    );
};
