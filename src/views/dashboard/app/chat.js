import React, { useEffect, useState } from "react";
import { Form, Tab, Nav } from "react-bootstrap";

import user1 from "../../../assets/images/chat/avatar/01.png";

import user10 from "../../../assets/images/chat/avatar/10.png";

import Scrollbar from "smooth-scrollbar";
import axios from "axios";
import { ApiLink } from "../../../store/setting/reducers";

const Chat = () => {

  //date
  const currentDate = new Date();
  const dateString = currentDate.toDateString();
  const parts = dateString.split(" ");
  const formattedDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  console.log(formattedDate);

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


  const contact = [
    {
      id: 1,
      profile: user1,
      name: "Paul Molive",
      timestamp: "03:20 PM",
      lastMessage: "lorem ipsum",
      copyContact: "0011100011",
    },
    {
      id: 2,
      profile: user1,
      name: "Watson",
      timestamp: "03:20 PM",
      lastMessage: "lorem ipsum",
      copyContact: "0011100012",
    },
    {
      id: 3,
      profile: user1,
      name: "Sam",
      timestamp: "03:20 PM",
      lastMessage: "lorem ipsum",
      copyContact: "0011100013",
    },
    {
      id: 4,
      profile: user1,
      name: "Malkova",
      timestamp: "03:20 PM",
      lastMessage: "lorem ipsum",
      copyContact: "0011100014",
    },
  ];

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
                {contact.map((items, i) => {
                  return (
                    <Nav.Item
                      as="li"
                      className="iq-chat-list mb-3 ps-0"
                      role="presentation"
                    >
                      <Nav.Link
                        className={`d-flex gap-3 rounded-2 zoom-in ${
                          active === i ? "active" : ""
                        }`}
                        onClick={() => setActive(i)}
                      >
                        <div className="position-relative">
                          <img
                            src={items.profile}
                            alt="status-101"
                            className="avatar-48 object-cover rounded-circle"
                            loading="lazy"
                          />
                          <div className="iq-profile-badge bg-success"></div>
                        </div>
                        <div className="d-flex align-items-top w-100 iq-userlist-data">
                          <div className="d-flex flex-grow-1 flex-column">
                            <div className="d-flex align-items-center gap-1">
                              <h6 className="mb-0 iq-userlist-name font-size-14 fw-semibold mb-0 text-ellipsis short-1 flex-grow-1">
                                {items.name}
                              </h6>
                              <span className="mb-0 font-size-12">
                                {items.timestamp}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <p className="text-ellipsis short-1 flex-grow-1 font-size-14 mb-0">
                                {items.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
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
                        <h5 className="mb-0">{contact[active]?.name}</h5>
                        <small className="text-capitalize fw-500">Online</small>
                      </div>
                    </div>
                  </header>
                </div>
                <div className="card-body chat-body bg-body">
                  {/* <div className="chat-day-title">
                    <span className="main-title">{formattedDate}</span>
                  </div> */}
                  <div className="iq-message-body iq-current-user">
                    <div className="chat-profile text-center">
                      <img
                        src={user10}
                        alt="chat-user"
                        className="avatar-40 rounded-pill"
                        loading="lazy"
                      />
                      <small className="iq-chating p-0 mb-0 d-block">
                        16:34
                      </small>
                    </div>
                    <div className="iq-chat-text">
                      <div className="d-flex align-items-center justify-content-end gap-1 gap-md-2">
                        <div className="iq-chating-content d-flex align-items-center">
                          <p className="mr-2 mb-0">
                            How can we help? We're here for you! 😄
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="iq-message-body iq-other-user">
                    <div className="chat-profile text-center">
                      <img
                        src={user1}
                        alt="chat-user"
                        className="avatar-40 rounded-pill"
                        loading="lazy"
                      />
                      <small className="iq-chating p-0 mb-0 d-block">
                        16:40
                      </small>
                    </div>
                    <div className="iq-chat-text">
                      <div className="d-flex align-items-center justify-content-start gap-md-2">
                        <div className="iq-chating-content d-flex align-items-center">
                          <p className="mr-2 mb-0">
                            Hey John, I am looking for the best admin
                            template.Could you please help me to find it out? 🤔
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer px-3 py-3 border-top rounded-0">
                  <form className="d-flex align-items-center" action="#">
                    <input
                      type="text"
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
