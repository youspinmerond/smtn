import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUser } from "../types/User";
import { useEffect, useState } from "react";
import { LOCAL_IP } from "../consts";
import { cleanUser } from "../store/slice";

export default function User() {
    const params = useParams<{id: string}>();
    const id = Number(params.id);
    if(isNaN(id)) return <h1 className="profile">Id is wrong</h1>;
    const user = useSelector((state: { userReducer: { user: IUser | null} }) => state.userReducer.user);
    const [account, setAccount] = useState<IUser | null>(null);

    const dispatch = useDispatch();

    function logOut() {
        dispatch(cleanUser());
        document.cookie = "token=; max-age=0";
    }

    useEffect(() => {
    }, [account]);

    useEffect(() => {
        fetch(`http://${LOCAL_IP}:3000/user/${id}`, {
        }).then((res) => res.json())
        .then(res => setAccount(res));
    }, []);

    return (
        <main>
            <div className="profile">
                <h1>Profile:</h1>
                {
                    user !== null ? id === user.id ?
                        <h3 className="message">It's your account</h3>
                        : null : null
                }
                <br />
                <h3>name: {account?.name}</h3>
                <h3>id: {account?.id}</h3>
                <div className="right">
                    <button className="redBtn" onClick={logOut}>Log out</button>
                </div>
            </div>
        </main>
    );
}