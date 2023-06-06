import { useEffect, useState } from "react";
import { Chat, Message } from "../../types/Chat";
import { IUser } from "../../types/User";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { addChat, addLocalStorate, getMessages, submit } from "./functions";
import { LOCAL_IP } from "../../consts";

export default function Chats() {
    const user = useSelector((state:{userReducer:{user: IUser | null}}) => state.userReducer.user);
    if(user === null) return <div>Something happened</div>;

    const [chats, setChats] = useState<Chat[] | []>([]);
    const [messages, setMessages] = useState<Message[] | []>([]);

    const [focused, setFocused] = useState<number | null>(null);
    const [modal, setModal] = useState<{show: boolean, content: any}>({show: false, content: ""});

    useEffect(() => {

        const localChats = localStorage.getItem("chats");
        if(localChats === undefined) return;

        fetch(`http://${LOCAL_IP}:3000/chat/6`, {
        }).then(res => res.json()).then(res => setChats((pr: Chat[] | []) => {
            addLocalStorate(localStorage, ["chats", chats]);
            const localChats = JSON.parse(localStorage.getItem("chats")!);

            const buffer = [...pr, res, ...localChats].map(chat => JSON.stringify(chat));
            const result = Array.from(new Set(buffer)).map(chat => JSON.parse(chat));
            return result;
        }));
        
    }, []);

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <div className="chats">
            {
                modal.show ? <Modal setState={setModal}>{modal.content}</Modal> : null
            }
            <div className="aside">
                <div className="addChat" tabIndex={0} onClick={() => addChat(user, setModal, setChats)}>
                    <div className="text">Add/Create Chat</div>
                </div>
                {
                    chats.map((chat, index) => {
                        return (
                            <div
                                key={chat.id}
                                className="chat"
                                tabIndex={0}
                                onClick={() => {setFocused(index); getMessages(chat.id, setMessages)}}>
                                <h2>{chat.name}</h2>
                                <h4>
                                    {chat.messages !== undefined ? chat.messages[chat.messages.length-1].authorId === user.id ?
                                    "You: " : "User: " : null}
                                    {chat.messages !== undefined ? chat.messages[chat.messages.length-1].content : null}
                                 </h4>
                            </div>
                        )
                    })
                }
            </div>
            <div className="section">
                {
                    focused !== null ? <h1>
                        {chats[focused].name}
                    </h1> : null
                }
                {
                    focused !== null ?
                        <>
                            {
                                chats !== null && chats[focused].messages !== undefined ? messages.map(message => {
                                    return (
                                        <div key={message.id} className="chatMessage">
                                            <div className="chatAuthor">
                                                {message.authorId === user.id ? "You: " : "User: "}
                                            </div>
                                            <div className="messageField">
                                                {message.content}
                                            </div>
                                        </div>
                                    );
                                }) : null
                            }
                            <div className="sendMessage">
                                <form onSubmit={(e) => submit(e, user, chats[focused].id)}>
                                    <textarea
                                        name="content"
                                        placeholder="Send message"
                                        className="sendMessageField"></textarea>
                                    <input type="submit" value=">>>" className="sendMessageButton"/>
                                </form>
                            </div>
                        </>
                        : null
                }
            </div>
        </div>
    );
}