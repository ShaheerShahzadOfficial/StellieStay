import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ProfileHeader from "../../../components/profile-header";
import CustomToggle from "../../../components/dropdowns";
import CreatePost from "../../../components/create-post";
import ShareOffcanvas from "../../../components/share-offcanvas";

//image
import img1 from "../../../assets/images/page-img/gi-1.jpg";
import user1 from "../../../assets/images/user/05.jpg";
import user2 from "../../../assets/images/user/06.jpg";
import user3 from "../../../assets/images/user/07.jpg";
import user4 from "../../../assets/images/user/08.jpg";
import user5 from "../../../assets/images/user/09.jpg";
import user6 from "../../../assets/images/user/10.jpg";
import user7 from "../../../assets/images/user/11.jpg";
import user8 from "../../../assets/images/user/12.jpg";
import img6 from "../../../assets/images/user/04.jpg";
import img7 from "../../../assets/images/page-img/52.jpg";
import img8 from "../../../assets/images/user/04.jpg";
import img9 from "../../../assets/images/page-img/60.jpg";
import img10 from "../../../assets/images/user/02.jpg";
import img11 from "../../../assets/images/user/03.jpg";
import header from "../../../assets/images/page-img/profile-bg7.jpg";
import icon1 from "../../../assets/images/icon/01.png";
import icon2 from "../../../assets/images/icon/02.png";
import icon3 from "../../../assets/images/icon/03.png";
import icon4 from "../../../assets/images/icon/04.png";
import icon5 from "../../../assets/images/icon/05.png";
import icon6 from "../../../assets/images/icon/06.png";
import icon7 from "../../../assets/images/icon/07.png";
import axios from "axios";
import { ApiLink } from "../../../store/setting/reducers";
import Post from "../../../components/custom/Post";
import Loader from "../../../components/custom/Loader";

const GroupDetail = () => {
  const { id } = useParams();
  const [GroupDetails, setGroupDetails] = useState();
  const [GroupPosts, setGroupPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${ApiLink}/group/getDetails/${id}`)
      .then((res) => {
        console.log(res.data);
        setGroupDetails(res.data.group);
        setGroupPosts(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {" "}
      {Loading ? (
        <div id="content-page" className="content-inner">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
              width: "100%",
            }}
          >
            <Loader />
          </div>
        </div>
      ) : (
        <>
          <ProfileHeader
            img={
              GroupDetails?.GroupBanner?.url
                ? GroupDetails?.GroupBanner?.url
                : header
            }
            title="Groups"
          />
          <div id="content-page" className="content-page">
            <Container>
              <Row>
                <Col lg="12">
                  <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap">
                    <div className="group-info d-flex align-items-center">
                      <div className="me-3">
                        <img
                          className="rounded-circle img-fluid avatar-100"
                          src={
                            GroupDetails?.groupIcon?.url
                              ? GroupDetails?.groupIcon?.url
                              : img1
                          }
                          alt=""
                        />
                      </div>
                      <div className="info">
                        <h4>{GroupDetails?.name}</h4>
                        <p className="mb-0">
                          {" "}
                          {GroupDetails?.users?.length} members
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg="8">
                  <CreatePost
                    IsGroupPost={true}
                    groupId={GroupDetails?._id}
                    setGroupPost={setGroupPosts}
                  />
                  {GroupPosts?.map((item, i) => (
                    <Post items={item} key={i} />
                  ))}
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default GroupDetail;
