import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../types/User";
import { LOCAL_IP } from "../consts";
import { changeUser } from "../store/slice";

export default function Registartion() {
    const user = useSelector((state: { userReducer: { user: IUser } }) => state.userReducer.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState<["good" | "bad", string]>(["bad", ""]);

    async function submit(e: FormEvent) {
        e.preventDefault();
        console.log(e);
        const target: {
            name: HTMLInputElement,
            password: HTMLInputElement,
            password2: HTMLInputElement
        } = e.target as any;
        
        const body = {
            name: target.name.value,
            password: target.password.value,
        }

        if(target.password.value === target.password2.value) {
            const res = await fetch(`http://${LOCAL_IP}:3000/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
            }).then(res => res.json());
            if("token" in res != true) {
                setMessage(["bad", "Something wrong, maybe you specified busied name, try other"])
            } else {
                dispatch(changeUser(res));
                setMessage(["good", "You signed in."]);
            }
        } else {
            setMessage(["bad", "Wrong password"])
        }
    }

    return (
        <div className="form">
            <div className="wrapper">
                <h1>Registration</h1>
                <h4>or <Link to="register">log in</Link></h4>
                {
                    message[1].length ?
                        <h4 style={{color: message[0] === "good" ? "green" : "red"}}>
                            {message[1]}
                        </h4>
                        : null
                }
                <form action="post" onSubmit={submit}>
                    <div className="inputForm">
                        <input disabled={user !== null} minLength={3} maxLength={16} type="text" name="name" placeholder="Name" />
                        <input disabled={user !== null} minLength={6} type="password" name="password" placeholder="Password" />
                        <input disabled={user !== null} minLength={6} type="password" name="password2" placeholder="Password 2" />
                        <input disabled={user !== null} type="submit" value="Registrate" />
                    </div>
                </form>
            </div>
        </div>
    )
}