import { useSelector } from "react-redux"
import { IUser } from "../types/User"
import { Link } from "react-router-dom"

export default function Navigation() {
    const user = useSelector((state:{userReducer:{user:IUser | null}}) => state.userReducer.user);

    function Nav() {
        if(user === null) {
            return (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/registration">
                        Registartion
                    </Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/">Chats</Link>
                    <Link to={`/user/${user.id}`} className="accountButton">{user.name}</Link>
                </>
            );
        }
    }

    return (
        <header>
            <div className="logo"></div>
            <nav>
                <Nav/>
            </nav>
        </header>
    )
}