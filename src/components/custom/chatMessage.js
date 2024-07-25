import React from "react";
import user10 from "../../assets/images/chat/avatar/10.png";
import { useSelector } from "react-redux";

const ChatMessage = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  return (
    // <div
    //   className={`iq-message-body ${
    //     message.Sender?._id === user._id ? "iq-current-user" : "iq-other-user"
    //   }`}
    // >
    //   <div className="chat-profile text-center">
    //     <img
    //       src={
    // message?.Sender?.profile_Picture?.url
    //   ? message?.Sender?.profile_Picture?.url
    //   : user10
    //       }
    //       alt="chat-user"
    //       className="avatar-40 rounded-pill"
    //       loading="lazy"
    //     />
    //     {/* <small className="iq-chating p-0 mb-0 d-block">
    //       {message?.createdOn?.split("T")[0]}
    //     </small> */}
    //   </div>
    //   <div className="iq-chat-text">
    //     <div className="d-flex align-items-center justify-content-end gap-1 gap-md-2">
    //       <div className="iq-chating-content d-flex align-items-center">
    //         <p className="mr-2 mb-0">{message?.message}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      {message.Sender?._id === user._id ? (
        <div className="iq-message-body iq-current-user">
          <div className="chat-profile text-center">
            <img
              src={
                message?.Sender?.profile_Picture?.url
                  ? message?.Sender?.profile_Picture?.url
                  : user10
              }
              alt="chat-user"
              className="avatar-40 rounded-pill"
              loading="lazy"
            />
            <small className="iq-chating p-0 mb-0 d-block">
              {" "}
              {message?.createdOn?.split("T")[0]}
            </small>
          </div>
          <div className="iq-chat-text">
            <div className="d-flex align-items-center justify-content-end gap-1 gap-md-2">
              <div className="iq-chating-content d-flex align-items-center">
                <p className="mr-2 mb-0">{message?.message}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="iq-message-body iq-other-user">
          <div className="chat-profile text-center">
            <img
              src={
                message?.Sender?.profile_Picture?.url
                  ? message?.Sender?.profile_Picture?.url
                  : user10
              }
              alt="chat-user"
              className="avatar-40 rounded-pill"
              loading="lazy"
            />
            <small className="iq-chating p-0 mb-0 d-block">
              {" "}
              {message?.createdOn?.split("T")[0]}
            </small>
          </div>
          <div className="iq-chat-text">
            <div className="d-flex align-items-center justify-content-start gap-md-2">
              <div className="iq-chating-content d-flex align-items-center">
                <p className="mr-2 mb-0">{message?.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessage;
