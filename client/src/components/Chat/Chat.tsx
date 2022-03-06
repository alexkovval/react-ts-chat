import React, { FC, useEffect, useState } from "react";
import styles from "./Chat.module.css";
import socket from "../../socket/socket";
import { IUser } from "../../models/User";
import { IMessage } from "../../models/Message";

interface ChatProps {
  user: IUser;
  roomId: string;
  messageList: IMessage[];
  setMessageList: Function;
}
export const Chat: FC<ChatProps> = ({
  user,
  roomId,
  messageList,
  setMessageList,
}) => {
  const [value, setValue] = useState<any>("");

  useEffect((): any => {
    socket.on("receive_message", (message) => {
      setMessageList((list: any) => [...list, message]);
    });
    return () => socket.disconnect();
  }, [socket]);

    const handleMessageButton = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newMessage: IMessage = {
      //???? it's ok?
      username: user.username || "",
      message: value,
      roomId,
    };
    await socket.emit("newMessage", newMessage);
    setValue("");
  };

  const handleMessageChange = async (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messageList.map((message: IMessage) => (
          <div className={styles.oneMessage} key={message._id}>
            {message.username}: {message.message}
          </div>
        ))}
      </div>
      <div className={styles.createMessage}>
        <input type="text" value={value} onChange={handleMessageChange} />
        <button className={styles.msgButton} onClick={handleMessageButton}>
          Send
        </button>
      </div>
    </div>
  );
};
