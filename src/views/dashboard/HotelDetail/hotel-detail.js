import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import imgm1 from "../../../assets/images/market/1.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ApiLink,
  ChatRoomState,
  getChatRoom,
} from "../../../store/setting/reducers";
import { useDispatch, useSelector } from "react-redux";

const HotelDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { chatRoom } = useSelector(ChatRoomState);
  const {user} = useSelector(state => state.user);

  const [HotelDetail, setHotelDetail] = useState();
  const [ChatGroup, setChatGroup] = useState();
  useEffect(() => {
    (async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      await axios(`${ApiLink}/hotel/get-Accomudation/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
        .then((result) => {
          console.log(result.data, "result.data.accomudation");
          setHotelDetail(result.data.accomudation);
          setChatGroup(result.data.chatGroup);
        })

        .catch((error) => {
          console.log(error.response || error);
        });
    })();
  }, []);

  const navigateToChat = async () => {
    if (user?._id === HotelDetail?.postedBy) return alert('no one can contact itself')

    if (ChatGroup) {
      // console.log(chatRoom)
      const index = chatRoom.findIndex((item) => {
        return item._id === ChatGroup._id;
      });
      console.log(index)

      if (index  < 0) {
        return;
      }
      navigate("/chat/index", { state: index });

    } else {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      // alert("No chat group found for this hotel");
      await axios
        .post(`${ApiLink}/chat/create-chat-room`,{userId:HotelDetail.postedBy}, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((result) => {
          console.log(result.data.result, "result.data.chatGroup");
          setChatGroup(result.data.result);
          const groups = [...chatRoom, result.data.result];
          dispatch(getChatRoom());
          // console.log(chatRoom)

          navigate("/chat/index", { state: groups.length });
        })
        .catch((error) => {
          console.error(error.response || error);
        });
    }
  };

  return (
    <>
      <div id="content-page" className="content-inner">
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {HotelDetail?.HotelImages?.map((image, i) => (
              <img
                key={i}
                src={image?.url}
                alt="mimg"
                className="avatar mb-3 d-inline-block m-2"
                loading="lazy"
                width={400}
                height={400}
              />
            ))}
          </div>

          <div
            style={{
              width: "100%",
              backgroundColor: "#fff",
              padding: "20px",
              minHeight: "400px",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            {/* <div className="features">
              <p>FEATURED</p>
            </div> */}
            <h1>{HotelDetail?.HotelName}</h1>
            <p>{HotelDetail?.HotelDescription}</p>
            <div className="mt-2"></div>
            <span className="text-warning d-block line-height mt-0">
              <span className="text-warning d-flex align-items-center mt-2">
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 text-gray me-1">
                  star
                </i>
                <small className="text-dark me-1">
                  {HotelDetail?.rating?.length}
                </small>
              </span>
            </span>
            <div className="mt-2"></div>
            {/* <span className="text-warning d-block line-height mt-0">
                  <li className="material-symbols-outlined">design_services</li>
                  <small>200sq</small>
                  </span> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "30%",
              }}
              className="my-2"
            >
              <span className="text-warning d-block line-height mt-0">
                <span className="text-warning d-flex align-items-center mt-2">
                  <li className="material-symbols-outlined">design_services</li>

                  <small className="text-dark me-1">
                    {HotelDetail?.Size} sq
                  </small>
                </span>
              </span>

              <span className="text-warning d-flex align-items-center mt-2">
                <li className="material-symbols-outlined">credit_card</li>

                <small className="text-dark me-1">Card</small>
              </span>

              {HotelDetail?.Wifi && (
                <span className="text-warning d-flex align-items-center mt-2">
                  <li className="material-symbols-outlined">wifi</li>

                  <small className="text-dark me-1">Wifi</small>
                </span>
              )}
            </div>

            <button className="features" disabled={user?._id === HotelDetail?.postedBy} onClick={navigateToChat}>
              Contact Now
            </button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetail;
