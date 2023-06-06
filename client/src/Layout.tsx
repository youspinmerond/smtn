import React, { useEffect } from "react";
import Navigation from "./components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "./types/User";
import { changeUser } from "./store/slice";
import { LOCAL_IP } from "./consts";

export default function Layout({children}: {children: React.ReactNode}) {
    const user = useSelector((state:{userReducer:{user: IUser | null}}) => state.userReducer.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(user === null) {
            document.cookie
                .split("; ")
                .forEach(element => {
                    const e = element.split("=");
                    
                    if(e[0] === "token") {
                        fetch(`http://${LOCAL_IP}:3000/user/check`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({token: e[1]}),
                        })
                            .then(res => res.json())
                            .then(res => {
                                if("err" in res !== true) {
                                    dispatch(changeUser(res))
                                } else return;
                                });
                    }
                });
        } else {
        }
    }, [user]);
    return (
        <>  
            <Navigation/>
            {children}
        </>
    )
}