import { Avatar, IconButton, } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState("");
    const [messages, setMessages] =useState([]);
    const [{ user}, dispatch] = useStateValue

    useEffect(() => {
        if (roomId) {
          db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot => 
              setRoomName(snapshot.data().name)
          ));  
            
          db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data()))
          );
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="Chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen{" "}
                        {new Date(
                             messages[messages.length - 1]?.timestamp?.todate()).toUTCString()}
                             </p>
                </div>

                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map((message) => ( 
                    <p className={`chat_message 
                    ${messages.name === user.displayName && `chat_receiver`}`}>
                    <span className="chat_name">{messages.name}</span>
                    {messages.message}
                    <span className="chat_timestamp">{new Date(messages.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
                
            </div>  

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="type a message" type="text" />
                    <buttton onClick={sendMessage} type="submit">Send a message</buttton>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;