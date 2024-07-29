import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";

// img
import user1 from "../../../assets/images/user/01.jpg";
import user2 from "../../../assets/images/user/02.jpg";
import user3 from "../../../assets/images/user/03.jpg";
import user04 from "../../../assets/images/user/04.jpg";
import user5 from "../../../assets/images/user/05.jpg";
import user6 from "../../../assets/images/user/06.jpg";
import user7 from "../../../assets/images/user/07.jpg";
import user8 from "../../../assets/images/user/08.jpg";
import user9 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import user11 from "../../../assets/images/user/11.jpg";
import user12 from "../../../assets/images/user/12.jpg";
import user13 from "../../../assets/images/user/13.jpg";
import user14 from "../../../assets/images/user/14.jpg";
import user4 from "../../../assets/images/user/4.jpg";
import { ApiLink } from "../../../store/setting/reducers";
import axios from "axios";

const Notification = () => {
  useEffect(() => {
    document.body.classList.add("notification");
    return () => {
      document.body.classList.remove("notification");
    };
  });
  const [Notification, setNotification] = useState([]);
  useEffect(() => {
    (async () => {
      const token = JSON.parse(localStorage.getItem("user"))?.token;

      axios
        .get(`${ApiLink}notification/getNotification`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(({ data }) => {
          setNotification(data.notification);
        }).catch((error)=>{
         console.log(error)
        })
    })();
  }, []);

  return (
    <>
      <div id="content-page" className="content-inner">
        <Container>
          <Row>
            <Col sm="12">
              <h4 className="card-title mb-3">Notification</h4>
            </Col>
            <Col sm="12">
              {Notification?.map((item, i) => (
                <Card key={i}>
                  <Card.Body>
                    <ul className="notification-list m-0 p-0">
                      <li className="d-flex align-items-center justify-content-between">
                        <div className="user-img img-fluid">
                          <img
                            src={user1}
                            alt="story-img"
                            className="rounded-circle avatar-40"
                          />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div className=" ms-3">
                              <h6>{item?.NotificationTitle}</h6>
                              {/* <p className="mb-0">30 minute ago</p> */}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Notification;
