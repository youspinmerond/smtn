import { FormEvent } from "react";
import { IUser } from "../../types/User";
import { LOCAL_IP } from "../../consts";
import FormType from "./components/FormType";
import { Chat, Message } from "../../types/Chat";

export function submit(e: FormEvent, user: IUser, chatId: number) {
    e.preventDefault();

    if(!e.target.content) return;
    const {content}: HTMLInputElement & any = e.target;

    const body = JSON.stringify({
        authorId: user.id,
        chatId,
        content: content.value
    });


    const res = fetch(`http://${LOCAL_IP}:3000/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    }).then(res => res.json())
    .then(console.log);
}

export function sendMessage(user: IUser, e: FormEvent, setChats: (pr: Chat[] | any) => Chat[] | []) {

    e.preventDefault();
    const target: EventTarget & {
        name: HTMLInputElement,
        content: HTMLInputElement,
        type: HTMLInputElement,
        password?: HTMLInputElement,
    } = e.target as any;
    let body: any = {
        name: target.name.value,
        type: target.type.value.toUpperCase(),
        firstMessage: {
            authorId: user!.id,
            content: target.content.value,
        }
    }
    if(target.password) body.password = target.password.value;
    body = JSON.stringify(body);
    
    fetch(`http://${LOCAL_IP}:3000/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    })
        .then(res => res.json())
        .then((res: [Chat, Message]) => res !== null ? setChats((pr: Chat[] | []) => [...pr, res[0]]) : null)
        .catch(console.error);
}

export function addChat(user: any, setModal: any, setChats: any) {
    setModal(
        {
            show: true,
            content: 
            <>
                <form onSubmit={(e) => sendMessage(user, e, setChats)}>
                    <h1>Create chat:</h1>
                    <input
                        type="text"
                        name="name"
                        placeholder="Chat name"
                        minLength={3}/>
                    <FormType/>
                    <textarea
                        name="content"
                        placeholder="Message content"
                        className="messageContent"
                        minLength={1}>
                    </textarea>
                    <input type="submit" value="Send!" />
                </form>
            </>
        }
    )
}

export function addLocalStorate(localStorage: Storage, data: [key: string, value: Array<Chat>]) {
    const field = localStorage.getItem(data[0]);
    if(field === null) {
        localStorage.setItem(data[0], JSON.stringify(data[1]));
        return data[1];
    } else {
        const newField: Array<Chat> = JSON.parse(field).concat(data[1]);
        const res = Array.from(new Set(newField.map(e => {
            return JSON.stringify(e);
        }))).map(e => JSON.parse(e));
        
        localStorage.setItem(data[0], JSON.stringify(res));
        return res;
    }
}

export async function getMessages(id: number, setMessages: any) {
    const result = await fetch(`http://${LOCAL_IP}:3000/chat/${id}?messages=true`).then(res => res.json());
    setMessages(result);
}