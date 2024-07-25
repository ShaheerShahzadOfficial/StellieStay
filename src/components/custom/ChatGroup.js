import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import user1 from "../../assets/images/chat/avatar/01.png";
import axios from "axios";
import { ApiLink } from "../../store/setting/reducers";

const ChatGroup = ({
  items,
  active,
  setActive,
  i,
  setMessages,
  setRoomUser,
}) => {
  const { user } = useSelector((state) => state.user);

  const otherUser = items?.users
    ?.filter((item) => {
      return item?._id !== user?._id;
    })
    ?.at(0);


  const getMessages = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    await axios
      .get(`${ApiLink}/chat/get-chat-room-Message/${items?._id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((result) => {
        setRoomUser(otherUser);

        setActive(i);
        console.log(result.data?.messages, "result.data.messages");
        setMessages(result.data?.messages);
      });
  };
  return (
    <Nav.Item as="li" className="iq-chat-list mb-3 ps-0" role="presentation">
      <Nav.Link
        className={`d-flex gap-3 rounded-2 zoom-in ${
          active === i ? "active" : ""
        }`}
        onClick={getMessages}
      >
        <div className="position-relative">
          <img
            src={
              otherUser.profile_picture?.url
                ? otherUser.profile_picture?.url
                : user1
            }
            alt="status-101"
            className="avatar-48 object-cover rounded-circle"
            loading="lazy"
          />
          {/* <div className="iq-profile-badge bg-success"></div> */}
        </div>
        <div className="d-flex align-items-top w-100 iq-userlist-data">
          <div className="d-flex flex-grow-1 flex-column">
            <div className="d-flex align-items-center gap-1">
              <h6 className="mb-0 iq-userlist-name font-size-14 fw-semibold mb-0 text-ellipsis short-1 flex-grow-1">
                {otherUser?.name}
              </h6>
              <span className="mb-0 font-size-12">
                {items?.lastMessage
                  ? items?.lastMessage?.createdOn?.split("T")[0]
                  : items.updatedAt?.split("T")[0]}
              </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <p className="text-ellipsis short-1 flex-grow-1 font-size-14 mb-0">
                {items?.lastMessage?.message}
              </p>
            </div>
          </div>
        </div>
      </Nav.Link>
    </Nav.Item>
  );
};

export default ChatGroup;
