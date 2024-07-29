import React, { useEffect, useState } from "react";
import { Form, Tab, Nav } from "react-bootstrap";

import user1 from "../../../assets/images/chat/avatar/01.png";

import user10 from "../../../assets/images/chat/avatar/10.png";

import Scrollbar from "smooth-scrollbar";
import axios from "axios";
import { ApiLink, ChatRoomState } from "../../../store/setting/reducers";
import { useSelector } from "react-redux";
import ChatGroup from "../../../components/custom/ChatGroup";
import ChatMessage from "../../../components/custom/chatMessage";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const { chatRoom } = useSelector(ChatRoomState);
  const { user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const [Message, setMessage] = useState([]);
  const [textMessage, setTextMessage] = useState("");

  useEffect(() => {
    if (state !== null) {
      setActive(state);
      console.log({ state, chatRoomId: chatRoom[state]?._id });
      const getMessages = async () => {
        const otherUser = chatRoom[state]?.users
          ?.filter((item) => {
            return item?._id !== user?._id;
          })
          ?.at(0);
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        await axios
          .get(
            `${ApiLink}/chat/get-chat-room-Message/${chatRoom[state]?._id}`,
            {
              headers: { Authorization: "Bearer " + token },
            }
          )
          .then((result) => {
            setRoomUser(otherUser);

            setActive(state);
            console.log(result.data?.messages, "result.data.messages");
            setMessage(result.data?.messages);
          });
      };
      return () => getMessages();
    }
  }, []);
  //date
  // const currentDate = new Date();
  // const dateString = currentDate.toDateString();
  // const parts = dateString.split(" ");
  // const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  // console.log(formattedDate);
  const [RoomUser, setRoomUser] = useState();
  //date

  useEffect(() => {
    Scrollbar.init(document.querySelector(".data-scrollbar"));
  });
  const [active, setActive] = useState(-1);

  const minisidebar = () => {
    document.getElementsByTagName("ASIDE")[0].classList.toggle("sidebar-mini");
  };

  // useEffect(() => {
  //   (async ()=>{
  //      axios.get(`${ApiLink}/chat//get-chat-room`).then((res)=>{

  //      })
  //   })()
  // }, []);

  // const contact = [
  //   {
  //     id: 1,
  //     profile: user1,
  //     name: "Paul Molive",
  //     timestamp: "03:20 PM",
  //     lastMessage: "lorem ipsum",
  //     copyContact: "0011100011",
  //   },
  //   {
  //     id: 2,
  //     profile: user1,
  //     name: "Watson",
  //     timestamp: "03:20 PM",
  //     lastMessage: "lorem ipsum",
  //     copyContact: "0011100012",
  //   },
  //   {
  //     id: 3,
  //     profile: user1,
  //     name: "Sam",
  //     timestamp: "03:20 PM",
  //     lastMessage: "lorem ipsum",
  //     copyContact: "0011100013",
  //   },
  //   {
  //     id: 4,
  //     profile: user1,
  //     name: "Malkova",
  //     timestamp: "03:20 PM",
  //     lastMessage: "lorem ipsum",
  //     copyContact: "0011100014",
  //   },
  // ];

  const sendMessage = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    await axios
      .post(
        `${ApiLink}/chat/add-Message/${chatRoom[active]._id}`,
        {
          message: textMessage,
          messageType: "text",
          Sender: user?._id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        console.log(res.data);
        const message = [...Message];
        message.push(res.data.result);
        setMessage(message);
        setTextMessage("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <aside
          className="sidebar sidebar-chat sidebar-base border-end shadow-none"
          data-sidebar="responsive"
        >
          <div className="chat-search pt-4 px-4">
            <div className="d-flex align-items-center">
              <h5 className="fw-500">Chats</h5>
            </div>
            <div
              className="sidebar-toggle d-block d-xl-none"
              data-toggle="sidebar"
              data-active="true"
              onClick={minisidebar}
            >
              <i className="icon">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.25 12.2744L19.25 12.2744"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </i>
            </div>
            <div className="chat-searchbar mt-3 pt-1 mb-4">
              <Form.Group className="form-group chat-search-data m-0">
                <input
                  type="text"
                  className="form-control round"
                  id="chat-search"
                  placeholder="Search for messages or users..."
                />
                <i className="material-symbols-outlined">search</i>
              </Form.Group>
            </div>
          </div>
          <div
            className="sidebar-body pt-0 data-scrollbar mb-5 pb-5 px-4"
            tabIndex="-1"
            style={{ overflow: "hidden", outline: "none" }}
          >
            <div
              className="scroll-content"
              style={{ transform: "translate3d(0px, 0px, 0px)" }}
            >
              <ul
                className="nav navbar-nav iq-main-menu mb-5 pb-5"
                id="sidebar-menu"
                role="tablist"
              >
                <h6 className="mb-3 pb-1">Recent Chats</h6>
                {chatRoom.map((items, i) => {
                  return (
                    <ChatGroup
                      key={i}
                      i={i}
                      items={items}
                      active={active}
                      setActive={setActive}
                      setMessages={setMessage}
                      setRoomUser={setRoomUser}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="sidebar-footer"></div>
        </aside>
        <main
          className={`main-content`}
          style={{ display: active >= 0 ? "block" : "none" }}
        >
          <div className="container-fluid content-inner p-0" id="page_layout">
            <Tab.Content id="myTabContent">
              <Tab.Pane
                eventKey="first"
                className="card mb-0 fade"
                id="user-content-101"
                role="tabpanel"
              >
                <div className="chat-head">
                  <header className="d-flex justify-content-between align-items-center pt-3 ps-3 pe-3 pb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="d-block d-xl-none">
                        <button
                          className="btn btn-sm btn-primary rounded btn-icon"
                          data-toggle="sidebar"
                          data-active="true"
                          onClick={minisidebar}
                        >
                          <span className="btn-inner">
                            <svg
                              className="icon-rtl"
                              width="20px"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
                              ></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                      <div className="avatar chat-user-profile m-0">
                        <img
                          src={user1}
                          alt="avatar"
                          className="avatar-50 rounded-pill"
                          loading="lazy"
                        />
                        <div className="iq-profile-badge bg-success"></div>
                      </div>
                      <div>
                        <h5 className="mb-0">{RoomUser?.name}</h5>
                        {/* <small className="text-capitalize fw-500">Online</small> */}
                      </div>
                    </div>
                  </header>
                </div>
                <div className="card-body chat-body bg-body">
                  {Message.map((message, i) => (
                    <ChatMessage message={message} key={i} />
                  ))}
                </div>
                <div className="card-footer px-3 py-3 border-top rounded-0">
                  <form
                    className="d-flex align-items-center"
                    onSubmit={sendMessage}
                  >
                    <input
                      type="text"
                      value={textMessage}
                      onChange={(e) => {
                        setTextMessage(e.target.value);
                      }}
                      className="form-control me-3"
                      placeholder="Type your message"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary d-flex align-items-center"
                    >
                      <svg
                        className="icon-20"
                        width="18"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.8325 6.67463L8.10904 12.4592L1.59944 8.38767C0.66675 7.80414 0.860765 6.38744 1.91572 6.07893L17.3712 1.55277C18.3373 1.26963 19.2326 2.17283 18.9456 3.142L14.3731 18.5868C14.0598 19.6432 12.6512 19.832 12.0732 18.8953L8.10601 12.4602"
                          stroke="currentcolor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className="d-none d-lg-block ms-1">Send</span>
                    </button>
                  </form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </main>
      </Tab.Container>
    </>
  );
};
export default Chat;
