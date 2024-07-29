import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link, useNavigate } from "react-router-dom";

// images
import gi1 from "../../../assets/images/page-img/gi-1.jpg";
import img1 from "../../../assets/images/page-img/profile-bg1.jpg";
import axios from "axios";
import { ApiLink } from "../../../store/setting/reducers";
import Loader from "../../../components/custom/Loader";
import { useSelector } from "react-redux";

const Groups = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Err, setErr] = useState("");
  const [Icon, setIcon] = useState();
  const [Banner, setBanner] = useState();
  const [Title, setTitle] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Groups, setGroups] = useState([]);

  const handleImageChange = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setIcon(Reader.result);
        }
      };
    }
  };
  const handleBannerImageChange = (e) => {
    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setBanner(Reader.result);
        }
      };
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!Title && !Icon && !Banner) {
      return setErr("All Fields Are Required");
    }
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    await axios
      .post(
        `${ApiLink}/group/create-group`,
        {
          name: Title,
          groupIcon: Icon,
          GroupBanner: Banner,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`${ApiLink}/group/get-groups`)
        .then(({ data }) => {
          console.log(data?.groups);
          setGroups(data?.groups);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, []);

  const joinGroup = async (id) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    await axios
      .put(
        `${ApiLink}/group/joinGroup/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(({ data }) => {
        if (data.message === "You have joined the group") {
          navigate(`/dashboards/app/group-detail/${id}`);
        }
      });
  };

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
          <div className="btn-Container container">
            <button onClick={handleShow}>New Group</button>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            centered
            id="custom-post-modal"
          >
            <div style={{ padding: "20px" }}>
              <h2 style={{ textAlign: "center" }}>New Group</h2>
              <Form onSubmit={handleUpload}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Group Icon</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Group Banner</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleBannerImageChange}
                    accept="image/*"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Group Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Group Name"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
                {Err && (
                  <div className="alert alert-danger mt-2" role="alert">
                    {Err}
                  </div>
                )}
              </Form>
            </div>
          </Modal>
          <Container>
            <div className="d-grid gap-3 d-grid-template-1fr-19">
              {Groups?.map((item, i) => (
                <Card key={i} className="group-box mb-0">
                  <div className="top-bg-image">
                    <img
                      src={
                        item?.GroupBanner?.url ? item?.GroupBanner?.url : img1
                      }
                      className="img-fluid w-100"
                      alt="group-bg"
                    />
                  </div>
                  <Card.Body className="text-center">
                    <div className="group-icon">
                      <img
                        src={item?.groupIcon?.url ? item?.groupIcon?.url : gi1}
                        alt="profile-img"
                        className="rounded-2 img-fluid avatar-90 border border-4"
                      />
                    </div>
                    <div className="group-info mt-3 mb-2">
                      <Link
                        to={`/dashboards/app/group-detail/${item?._id}`}
                        className="h4"
                      >
                        {item?.name}
                      </Link>
                    </div>
                    <div className="group-details pb-4 mb-4 border-bottom">
                      <ul className="d-flex align-items-center justify-content-center list-inline m-0 p-0 gap-3">
                        {/* <li>
                          <div className="d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined font-size-18">
                              description
                            </span>
                            <span className="text-capitalize">1 posts</span>
                          </div>
                        </li> */}
                        <li>
                          <div className="d-flex align-items-center gap-1">
                            <span className="material-symbols-outlined font-size-18">
                              group
                            </span>
                            <span className="text-capitalize">
                              Members {item?.users?.length}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <button
                      onClick={()=>joinGroup(item._id)}
                      type="submit"
                      className="btn btn-primary-subtle fw-semibold px-3"
                    >
                      {item?.users?.includes(user?._id)
                        ? "Leave Group"
                        : " Join Group"}
                    </button>
                  </Card.Body>
                </Card>
              ))}

              {/* <Card className="group-box mb-0">
                <div className="top-bg-image">
                  <img src={img1} className="img-fluid w-100" alt="group-bg" />
                </div>
                <Card.Body className="text-center">
                  <div className="group-icon">
                    <img
                      src={gi1}
                      alt="profile-img"
                      className="rounded-2 img-fluid avatar-90 border border-4"
                    />
                  </div>
                  <div className="group-info mt-3 mb-2">
                    <Link to="/dashboards/app/group-detail" className="h4">
                      Designer
                    </Link>
                  </div>
                  <div className="group-details pb-4 mb-4 border-bottom">
                    <ul className="d-flex align-items-center justify-content-center list-inline m-0 p-0 gap-3">
                      <li>
                        <div className="d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined font-size-18">
                            description
                          </span>
                          <span className="text-capitalize">1 posts</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex align-items-center gap-1">
                          <span className="material-symbols-outlined font-size-18">
                            group
                          </span>
                          <span className="text-capitalize">Members 100</span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary-subtle fw-semibold px-3"
                  >
                    Join Group
                  </button>
                </Card.Body>
              </Card> */}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Groups;
