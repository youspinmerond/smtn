import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../types/User";
import Chats from "../modules/Chats/main";

function Main() {
  const user = useSelector((state:{userReducer: {user: IUser}}) => state.userReducer.user);

  if(user === null) {
    return (
      <>
        <div>
          You must <Link to="/login">log in</Link> or <Link to="/registration">register</Link>.
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
            <Chats/>
        </div>
      </>
    )
  }
}

export default Main;