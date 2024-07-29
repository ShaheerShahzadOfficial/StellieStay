import React, { useEffect, useState } from "react";
import { Row, Col, Container, Dropdown, Nav, Tab } from "react-bootstrap";
import Card from "../../../components/Card";
import CreatePost from "../../../components/create-post";
import { Link } from "react-router-dom";
import ReactFsLightbox from "fslightbox-react";

// images
import img1 from "../../../assets/images/page-img/fun.webp";
import user1 from "../../../assets/images/user/1.jpg";
import user05 from "../../../assets/images/user/05.jpg";
import user01 from "../../../assets/images/user/01.jpg";
import user02 from "../../../assets/images/user/02.jpg";
import user03 from "../../../assets/images/user/03.jpg";
import user06 from "../../../assets/images/user/06.jpg";
import user07 from "../../../assets/images/user/07.jpg";
import user08 from "../../../assets/images/user/08.jpg";
import user09 from "../../../assets/images/user/09.jpg";
import user10 from "../../../assets/images/user/10.jpg";
import user15 from "../../../assets/images/user/15.jpg";
import user16 from "../../../assets/images/user/16.jpg";
import user17 from "../../../assets/images/user/17.jpg";
import user18 from "../../../assets/images/user/18.jpg";
import user19 from "../../../assets/images/user/19.jpg";
import g1 from "../../../assets/images/page-img/g1.jpg";
import g2 from "../../../assets/images/page-img/g2.jpg";
import g3 from "../../../assets/images/page-img/g3.jpg";
import g4 from "../../../assets/images/page-img/g4.jpg";
import g5 from "../../../assets/images/page-img/g5.jpg";
import g6 from "../../../assets/images/page-img/g6.jpg";
import g7 from "../../../assets/images/page-img/g7.jpg";
import g8 from "../../../assets/images/page-img/g8.jpg";
import g9 from "../../../assets/images/page-img/g9.jpg";
import img51 from "../../../assets/images/page-img/51.jpg";
import img52 from "../../../assets/images/page-img/52.jpg";
import img53 from "../../../assets/images/page-img/53.jpg";
import img54 from "../../../assets/images/page-img/54.jpg";
import img55 from "../../../assets/images/page-img/55.jpg";
import img56 from "../../../assets/images/page-img/56.jpg";
import img57 from "../../../assets/images/page-img/57.jpg";
import img58 from "../../../assets/images/page-img/58.jpg";
import img59 from "../../../assets/images/page-img/59.jpg";
import img60 from "../../../assets/images/page-img/60.jpg";
import img61 from "../../../assets/images/page-img/61.jpg";
import img62 from "../../../assets/images/page-img/62.jpg";
import img64 from "../../../assets/images/page-img/64.jpg";
import img65 from "../../../assets/images/page-img/65.jpg";
import img63 from "../../../assets/images/page-img/63.jpg";

import mountain from "../../../assets/images/page-img/mountain.webp";
import pizza from "../../../assets/images/page-img/pizza.webp";
import busImg from "../../../assets/images/page-img/bus.webp";
import boyImg from "../../../assets/images/page-img/boy.webp";
import img11 from "../../../assets/images/page-img/fd.webp";

import { useSelector } from "react-redux";
import Post from "../../../components/custom/Post";
// Fslightbox plugin
const FsLightbox = ReactFsLightbox.default
  ? ReactFsLightbox.default
  : ReactFsLightbox;

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

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

  return (
    <>
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
                          <span className="badge  bg-primary rounded-pill material-symbols-outlined font-size-14 p-0 custom-done">
                            done
                          </span>
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
                          <Col>
                            <CreatePost />
                          </Col>
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
                                    {user?.followers?.map((item) => (
                                      <div className="col-md-6 col-lg-6 mb-3">
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
    </>
  );
};

export default UserProfile;
