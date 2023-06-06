import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeUser } from "../store/slice";
import { IUser } from "../types/User";
import { LOCAL_IP } from "../consts";

export default function Login() {
    const user = useSelector((state: { userReducer: { user: IUser } }) => state.userReducer.user);
    const dispatch = useDispatch();
    const [message, setMessage] = useState<["good" | "bad", string]>(["bad", ""]);

    async function submit(e: FormEvent) {
        e.preventDefault();
        const target = e.target as EventTarget & { name: HTMLInputElement, password: HTMLInputElement };
        const body = {
            name: target.name.value,
            password: target.password.value
        }

        const res = await fetch(`http://${LOCAL_IP}:3000/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        }).then(res => res.json());

        if("msg" in res !== true) {
            dispatch(changeUser(res));
            document.cookie = `token=${res.token}; path=/`;
            setMessage(["good", "You signed in."])
        } else {
            setMessage(
                [
                    "bad",
                    res.msg === null ?
                        "You specified wrong name or password"
                        : "Something wrong with request or server :("
                ]);
        }
    }
    useEffect(() => {
        if(user !== null) setMessage(["good", "You're logged, already!"])
    }, [user]);
    return (
        <div className="form">
            <div className="wrapper">
                <h1>Log in</h1>
                <h4>or <Link to="register">register</Link></h4>
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
                        <input disabled={user !== null} type="submit" value="Log in" />
                    </div>
                </form>
            </div>
        </div>
    );
}