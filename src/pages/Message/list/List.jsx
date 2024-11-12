import ChatList from "./chatList/chatList";
import "./list.css"
import Userinfo from "./userInfo/userInfo";

const List = () => {
    return (
        <div className='list'>
            <Userinfo />
            <ChatList />
        </div>

    );
};

export default List;