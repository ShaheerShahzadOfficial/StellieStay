import React, { useEffect, useState } from "react";
import { Row, Col, Container, Nav, Tab, Button } from "react-bootstrap";
import Card from "../../../components/Card";
import CreatePost from "../../../components/create-post";
import { Link, useParams } from "react-router-dom";

// images
import user1 from "../../../assets/images/user/1.jpg";
import user05 from "../../../assets/images/user/05.jpg";

import { useSelector } from "react-redux";
import Post from "../../../components/custom/Post";
import axios from "axios";
import { ApiLink } from "../../../store/setting/reducers";
import Loader from "../../../components/custom/Loader";
// Fslightbox plugin

const OtherUserProfile = () => {
  const [user, setUser] = useState();
  const { user: me } = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await axios
        .get(`${ApiLink}/user/getUser/${id}`)
        .then(({ data }) => {
          console.log(data);
          setUser(data?.user);
          data?.user?.followers?.forEach((item) => {
            if (item._id === me._id) {
              setIsFollowed(true);
            } else {
              setIsFollowed(false);
            }
          });
        })
        .catch((error) => {
          console.log(error?.response || error);
        }).finally(()=>{setLoading(false)})
    })();
  }, [user]);

  useEffect(() => {
    document.body.classList.add("profile-page");
    return () => {
      document.body.classList.remove("profile-page");
    };
  });

  const aboutData = [
    {
      title: "About Me:",
      data: user?.Bio || "BIO",
    },
    {
      title: "Email:",
      data: user?.email,
    },
    {
      title: "Mobile:",
      data: user?.phoneNumber,
    },
    {
      title: "City",
      data: user?.city,
    },
    {
      title: "Country",
      data: user?.country,
    },
    {
      title: "Birth Date:",
      data: user?.DOB,
    },
    {
      title: "Gender:",
      data: user?.gender,
    },
    {
      title: "Language:",
      data: user?.Language,
    },
    {
      title: "Joined:",
      data: user?.Joined?.split("T")[0],
    },
  ];

  const [IsFollowed, setIsFollowed] = useState(false);

  const followUnFollowUser = async () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    await axios
      .put(
        `${ApiLink}/user/user-Follow-Unfollow/${id}`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then(async ({ data }) => {
        console.log("data ====>", data);

        await axios
          .get(`${ApiLink}/user/getUser/${id}`)
          .then(({ data }) => {
            console.log(data);
            setUser(data?.user);
            data?.user?.followers?.forEach((item) => {
              if (item._id === me._id) {
                setIsFollowed(true);
              } else {
                setIsFollowed(false);
              }
            });
          })
          .catch((error) => {
            console.log(error?.response || error);
          });
      })
      .catch((error) => {
        console.log(error?.response || error);
      });
  };
  const [Loading, setLoading] = useState(true);

  return ( 
    <>
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
        <div id="content-page" className="content-inner">
          <Container className="position-relative p-0">
            <div
              className="header-cover-img"
              style={{
                backgroundColor: "#62223c",
              }}
            ></div>
          </Container>
          <Container>
            <Row>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Col sm={12}>
                  <Card className="profile-box">
                    <Card.Body>
                      <Row className="align-items-center justify-content-center item-header-content">
                        <Col lg={4} className="text-center profile-center">
                          <div className="header-avatar position-relative d-inline-block">
                            <span className="change-profile-image bg-primary rounded-pill">
                              <span className="material-symbols-outlined text-white font-size-16">
                                photo_camera
                              </span>
                            </span>
                            <img
                              src={
                                user?.profile_Picture?.url
                                  ? user?.profile_Picture?.url
                                  : user1
                              }
                              alt="user"
                              className="avatar-150 border border-4 border-white rounded-3"
                            />
                          </div>
                          <h5 className="d-flex align-items-center justify-content-center gap-1 mb-2">
                            {user?.name}
                            {/* <span className="badge  bg-primary rounded-pill material-symbols-outlined font-size-14 p-0 custom-done">
                            done
                          </span> */}
                          </h5>
                          <ul className="d-flex align-items-center justify-content-center gap-3 list-inline p-0 m-0">
                            {user?.city && (
                              <li className="d-flex align-items-center gap-1">
                                <h6 className="material-symbols-outlined font-size-14">
                                  location_on
                                </h6>
                                <span className="font-size-14 text-uppercase fw-500">
                                  {user?.city}
                                </span>
                              </li>
                            )}
                          </ul>
                        </Col>
                        <Col lg={4} className="profile-right">
                          <ul className="user-meta list-inline p-0 d-flex align-items-center justify-content-center">
                            <li>
                              <h5>{user?.post?.length}</h5>Posts
                            </li>
                            <li>
                              <h5>{user?.followers?.length}</h5>Follower
                            </li>
                            <li>
                              <h5>{user?.following?.length}</h5>Following
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <Row>
                        <div
                          className="justify-content-center align-item-center"
                          style={{ display: "flex" }}
                        >
                          <Button
                            onClick={followUnFollowUser}
                            className="btn btn-primary px-4"
                          >
                            {" "}
                            {IsFollowed ? "UnFollow" : "Follow"}
                          </Button>
                        </div>
                      </Row>
                    </Card.Footer>
                  </Card>
                  <Card>
                    <Card.Body className="p-0">
                      <div className="user-tabing item-list-tabs">
                        <Nav
                          as="ul"
                          variant="pills"
                          className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0 rounded"
                        >
                          <Nav.Item as="li" className=" col-12 col-sm-3">
                            <Nav.Link
                              href="#pills-timeline-tab"
                              eventKey="first"
                              role="button"
                              className=" d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                            >
                              <span className="icon rounded-3">
                                <span className="material-symbols-outlined">
                                  calendar_month
                                </span>
                              </span>
                              <p className="mb-0 mt-0 mt-md-3">Timeline</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="col-12 col-sm-3">
                            <Nav.Link
                              href="#pills-about-tab"
                              eventKey="second"
                              role="button"
                              className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                            >
                              <span className="icon rounded-3">
                                <span className="material-symbols-outlined">
                                  person
                                </span>
                              </span>{" "}
                              <p className="mb-0 mt-0 mt-md-3">About</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className=" col-12 col-sm-3 ">
                            <Nav.Link
                              href="#pills-friends-tab"
                              eventKey="third"
                              role="button"
                              className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                            >
                              <span className="icon rounded-3">
                                <span className="material-symbols-outlined">
                                  group
                                </span>
                              </span>
                              <p className="mb-0 mt-0 mt-md-3">Followers</p>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li" className="col-12 col-sm-3">
                            <Nav.Link
                              href="#pills-photos-tab"
                              eventKey="forth"
                              role="button"
                              className="d-flex flex-md-column align-items-center flex-row justify-content-center gap-2"
                            >
                              <span className="icon rounded-3">
                                <span className="material-symbols-outlined">
                                  group
                                </span>
                              </span>
                              <p className="mb-0 mt-0 mt-md-3">Following</p>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Card.Body className=" p-0">
                        <Row>
                          <Row>
                            {/* <Col>
                            <CreatePost />
                          </Col> */}
                            {user?.post?.map((items, i) => (
                              <Post items={items} key={i} />
                            ))}
                          </Row>
                          {/* </Col> */}
                        </Row>
                      </Card.Body>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="about1"
                      >
                        <Row>
                          <Card>
                            <Card.Body>
                              <Tab.Content>
                                <Tab.Pane eventKey="about1">
                                  <h4>Personal Info</h4>
                                  <hr />
                                  <div className="table-responsive">
                                    <table className="table profile-table">
                                      <tbody>
                                        {aboutData.map((item, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                <h6>{item.title}</h6>
                                              </td>
                                              <td>
                                                <p className="mb-0">
                                                  {item.data}
                                                </p>
                                              </td>
                                            </tr>
                                          );
                                        })}
                                      </tbody>
                                    </table>
                                  </div>
                                </Tab.Pane>
                              </Tab.Content>
                            </Card.Body>
                          </Card>
                          {/* </Col> */}
                        </Row>
                      </Tab.Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="all-friends"
                      >
                        <Card>
                          <Card.Body>
                            <h2>Followers</h2>
                            <div className="friend-list-tab mt-2">
                              <Tab.Content>
                                <Tab.Pane eventKey="all-friends">
                                  <Card.Body className="p-0">
                                    <Row>
                                      {user?.followers?.map((item, i) => (
                                        <div
                                          key={i}
                                          className="col-md-6 col-lg-6 mb-3"
                                        >
                                          <div className="iq-friendlist-block">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="d-flex align-items-center">
                                                <Link
                                                  to={`/dashboard/app/user/${item?._id}`}
                                                >
                                                  <img
                                                    loading="lazy"
                                                    src={
                                                      item?.profile_Picture?.url
                                                        ? item?.profile_Picture
                                                            ?.url
                                                        : user05
                                                    }
                                                    alt="profile-img"
                                                    className="avatar-150 border border-4 border-white rounded-3"
                                                  />
                                                </Link>
                                                <div className="friend-info ms-3">
                                                  <h5>{item?.name}</h5>
                                                  <p className="mb-0">
                                                    {item.followers?.length}{" "}
                                                    Follower
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </Row>
                                  </Card.Body>
                                </Tab.Pane>
                              </Tab.Content>
                            </div>
                          </Card.Body>
                        </Card>
                      </Tab.Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="forth">
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="all-friends"
                      >
                        <Card>
                          <Card.Body>
                            <h2>Following</h2>
                            <div className="friend-list-tab mt-2">
                              <Tab.Content>
                                <Tab.Pane eventKey="all-friends">
                                  <Card.Body className="p-0">
                                    <Row>
                                      {user?.following?.map((item, i) => (
                                        <div
                                          key={i}
                                          className="col-md-6 col-lg-6 mb-3"
                                        >
                                          <div className="iq-friendlist-block">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <div className="d-flex align-items-center">
                                                <Link
                                                  to={`/dashboard/app/user/${item?._id}`}
                                                >
                                                  <img
                                                    loading="lazy"
                                                    src={
                                                      item?.profile_Picture?.url
                                                        ? item?.profile_Picture
                                                            ?.url
                                                        : user05
                                                    }
                                                    alt="profile-img"
                                                    className="img-fluid"
                                                  />
                                                </Link>
                                                <div className="friend-info ms-3">
                                                  <h5>{item?.name}</h5>
                                                  <p className="mb-0">
                                                    {item.followers?.length}{" "}
                                                    Follower
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </Row>
                                  </Card.Body>
                                </Tab.Pane>
                              </Tab.Content>
                            </div>
                          </Card.Body>
                        </Card>
                      </Tab.Container>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Tab.Container>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default OtherUserProfile;
