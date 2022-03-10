import { useEffect, useState } from "react";
import socket from "../../socket/socket";

import { Chat } from "../Chat/Chat";
import styles from "./Rooms.module.css";
import { IRoom } from "../../models/Room";
import { IMessage } from "../../models/Message";

export const Rooms = () => {
  const [messageList, setMessageList] = useState<IMessage[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [roomId, setRoomId] = useState<string>("");

  //GET USER FROM LOGIN
  const user = JSON.parse(localStorage.getItem("user") || "");
  let tokenStorage = localStorage.getItem("jwt");

  useEffect(() => {
    fetch("http://localhost:5000/rooms", {
      headers: {
        "x-access-token": tokenStorage || "",
      },
    })
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  const openRoom = (roomId: string) => {
    socket.connect();
    const oldRoomId = localStorage.getItem("roomId");
    socket.emit("leave_room", oldRoomId);
    setMessageList([]);
    setRoomId(roomId);
    socket.emit("join_room", roomId);
    localStorage.setItem("roomId", roomId);
    fetch("http://localhost:5000/messages/room", {
      method: "POST",
      headers: {
        "x-access-token": tokenStorage || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: roomId,
      }),
    })
      .then((response) => response.json())
      .then((data) => setMessageList(data));
  };

  const handleOpenRoom = (room: any) => {
    openRoom(room._id || "");
  };

  return (
    <div className={styles.mainContainer}>
      <h3>Rooms</h3>
      <div className={styles.rooms}>
        <div className={styles.room}>
          <div>
            {rooms.length &&
              rooms.map((room) => (
                <button
                  key={room._id}
                  onClick={() => {
                    handleOpenRoom(room);
                  }}
                >
                  {room.name}
                </button>
              ))}
          </div>
        </div>
      </div>
      {messageList && (
        <>
          <h3>{roomId}</h3>
          <Chat
            user={user}
            roomId={roomId}
            setMessageList={setMessageList}
            messageList={messageList}
          />
        </>
      )}
    </div>
  );
};
