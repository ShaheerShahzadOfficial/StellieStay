import React, { useEffect, useState } from "react";
import Card from "../Card";
import { Col, Collapse, Dropdown, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import ShareOffcanvasNew from "../ShareOffcanvasNew";
import icon1 from "../../assets/images/icon/01.png";
import icon2 from "../../assets/images/icon/02.png";
import icon3 from "../../assets/images/icon/03.png";
import icon4 from "../../assets/images/icon/04.png";
import icon5 from "../../assets/images/icon/05.png";
import icon6 from "../../assets/images/icon/06.png";
import icon7 from "../../assets/images/icon/07.png";
import user6 from "../../assets/images/user/13.jpg";
import ReactFsLightbox from "fslightbox-react";

import user1 from "../../assets/images/user/1.jpg";
import user01 from "../../assets/images/user/01.jpg";
import axios from "axios";
import { ApiLink } from "../../store/setting/reducers";
import { useSelector } from "react-redux";
const Post = ({ items }) => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });
  const [commentArray, setcommentArray] = useState([]);
  const [LikeArray, setLikeArray] = useState([]);
  function imageOnSlide(number) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }
  useEffect(() => {
    setcommentArray(items.comments);
    setLikeArray(items?.likes);

    // items.likes;

    items?.likes.forEach((item) => {
      if (item?._id === user?._id) {
        setIsLiked(true);
      }
    });
  }, [items?.likes]);
  const [modalShow, setModalShow] = useState(false);
  const [Comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const FsLightbox = ReactFsLightbox.default
    ? ReactFsLightbox.default
    : ReactFsLightbox;

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    axios
      .put(
        `${ApiLink}/post/add-comment/${items?._id}`,
        {
          comment: Comment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const commentsArray = commentArray;

        setcommentArray(
          commentsArray.concat([
            {
              user: res.data?.user,
              comment: Comment,
              _id: 2320909,
            },
          ])
        );

        setComment('')
      })
      .catch((error) => {
        console.log(error.response || error);
      });
  };

  const like = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    axios
      .put(
        `${ApiLink}/post/likeUnlike/${items?._id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Post liked Successfully") {
          const likesArray = LikeArray;
          setIsLiked(true);
          setLikeArray(likesArray.concat([user._id]));
        } else {
          const likesArray = LikeArray;
          setIsLiked(false);
          setLikeArray(likesArray.filter((item) => item?._id !== user?._id));
        }
      })
      .catch((error) => {
        console.log(error.response || error);

      });
  };
  return (
    <Row className="special-post-container">
                  <Col sm={12} className="special-post">
    <Card className=" card-block card-stretch card-height">
      <FsLightbox
        toggler={imageController.toggler}
        sources={items.file?.map((item) => item.url)}
        slide={imageController.slide}
      />
      <Card.Body>
        <div className="user-post-data">
          <div className="d-flex align-items-center justify-content-between">
            <div className="me-3 flex-shrik-0">
              <img
                className="border border-2 rounded-circle user-post-profile"
                src={items.profile ? items.profile : user01}
                alt=""
              />
            </div>
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0 d-inline-block">{items.postedBy.name}</h6>{" "}
                  <span className="d-inline-block text-primary">
                    <svg
                      className="align-text-bottom"
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.8457 0H4.34822C1.73547 0 0.0974121 1.84995 0.0974121 4.46789V11.5321C0.0974121 14.1501 1.72768 16 4.34822 16H11.8449C14.4663 16 16.0974 14.1501 16.0974 11.5321V4.46789C16.0974 1.84995 14.4663 0 11.8457 0Z"
                        fill="currentColor"
                      />
                      <path
                        d="M5.09741 7.99978L7.09797 9.9995L11.0974 6.00006"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>{" "}
                  {/* <span className="mb-0 d-inline-block text-capitalize fw-medium">
                    posted an update
                  </span> */}
                  <p className="mb-0">{items.createdOn.split("T")[0]}</p>
                </div>

                {/* <div className="card-post-toolbar">
                  <Dropdown>
                    <Dropdown.Toggle id="post-option" as="span">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="m-0 p-0">
                      <Dropdown.Item className=" p-3" to="#">
                        <div className="d-flex align-items-top">
                          <span className="material-symbols-outlined">
                            save
                          </span>
                          <div className="data ms-2">
                            <h6>Save Post</h6>
                            <p className="mb-0">Add this to your saved items</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="p-3" to="#">
                        <div className="d-flex align-items-top">
                          <span className="material-symbols-outlined">
                            cancel
                          </span>
                          <div className="data ms-2">
                            <h6>Hide Post</h6>
                            <p className="mb-0">See fewer posts like this.</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className=" p-3" to="#">
                        <div className="d-flex align-items-top">
                          <span className="material-symbols-outlined">
                            person_remove
                          </span>
                          <div className="data ms-2">
                            <h6>Unfollow User</h6>
                            <p className="mb-0">
                              Stop seeing posts but stay friends.
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className=" p-3" to="#">
                        <div className="d-flex align-items-top">
                          <span className="material-symbols-outlined">
                            notifications
                          </span>
                          <div className="data ms-2">
                            <h6>Notifications</h6>
                            <p className="mb-0">
                              Turn on notifications for this post
                            </p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="m-0">{items.caption}</p>
          {/* <ul className="list-inline m-0 p-0 d-flex flex-wrap gap-1">
                              <li>
                                <Link to="#">#friends</Link>
                              </li>
                              <li>
                                <Link to="#">#party</Link>
                              </li>
                              <li>
                                <Link to="#">#birthday</Link>
                              </li>
                              <li>
                                <Link to="#">#together</Link>
                              </li>
                              <li>
                                <Link to="#">#celebration</Link>
                              </li>
                            </ul> */}
        </div>
        <div className="user-post mt-4">
          {items.file.map((image, i) => (
            <Link
              onClick={() => imageOnSlide(1)}
              to="#"
              className="rounded"
              key={i}
            >
              <img
                src={image.url}
                alt="post-images"
                className="img-fluid rounded w-100"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
        {/* <div className="post-meta-likes mt-4">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                              <ul className="list-inline m-0 p-0 post-user-liked-list">
                                <li>
                                  <img
                                    src={user01}
                                    alt="userimg"
                                    className="rounded-circle img-fluid userimg"
                                    loading="lazy"
                                  />
                                </li>{" "}
                                <li>
                                  <img
                                    src={user2}
                                    alt="userimg"
                                    className="rounded-circle img-fluid userimg"
                                    loading="lazy"
                                  />
                                </li>{" "}
                                <li>
                                  <img
                                    src={user3}
                                    alt="userimg"
                                    className="rounded-circle img-fluid userimg"
                                    loading="lazy"
                                  />
                                </li>{" "}
                                <li>
                                  <img
                                    src={user4}
                                    alt="userimg"
                                    className="rounded-circle img-fluid userimg"
                                    loading="lazy"
                                  />
                                </li>{" "}
                              </ul>
                              <div className="d-inline-flex align-items-center gap-1">
                                <h6 className="m-0 font-size-14">Aliana Molex</h6>
                                <span
                                  className="text-capitalize font-size-14 fw-medium"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#likemodal"
                                >
                                  and 208 others liked this
                                </span>
                              </div>
                            </div>
                          </div> */}
        <div className="comment-area mt-4 pt-4 border-top">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
              <div className="like-data">
                <div className="dropdown" onClick={like}>
                  <span
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    role="button"
                  >
                    {isLiked ? (
                      <span className="material-symbols-outlined align-text-top font-size-20 like">
                        thumb_up
                      </span>
                    ) : (
                      <span className="material-symbols-outlined align-text-top font-size-20">
                        thumb_up
                      </span>
                    )}
                    <span className="fw-medium">{items.length} Likes</span>
                  </span>
                  {/* <div className="dropdown-menu py-2 shadow">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Like</Tooltip>}
                      className="ms-2 me-2"
                    >
                      <img src={icon1} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Love</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon2} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Happy</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon3} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>HaHa</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon4} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Think</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon5} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Sad</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon6} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Lovely</Tooltip>}
                      className="me-2"
                    >
                      <img src={icon7} className="img-fluid me-2" alt="" />
                    </OverlayTrigger>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center gap-3 flex-shrink-0">
              <div
                className="total-comment-block"
                type="button"
                aria-controls="commentcollapes"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <span className="material-symbols-outlined align-text-top font-size-20">
                  comment
                </span>{" "}
                <span className="fw-medium">
                  {commentArray?.length} Comment
                </span>
              </div>

              {/* <div className="share-block d-flex align-items-center feather-icon">
                                  <Link
                                    to="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#share-btn"
                                    onClick={() => setModalShow(true)}
                                    aria-controls="share-btn"
                                    className="d-flex align-items-center"
                                  >
                                    <span className="material-symbols-outlined align-text-top font-size-20">
                                      share
                                    </span>
                                    <span className="ms-1 fw-medium">
                                      99 Share
                                    </span>
                                  </Link>
                                </div> */}
              <ShareOffcanvasNew
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>

          <Collapse in={open}>
            <div id="commentcollapes" className="border-top mt-4 pt-4">
              {commentArray.map((comment, i) => (
                <div key={i}>
                  <ul className="list-inline m-o p-0 comment-list">
                    <li className="mb-3">
                      <div className="comment-list-block">
                        <div className="d-flex align-items-center gap-3">
                          <div className="comment-list-user-img flex-shrink-0">
                            <img
                              src={
                                comment?.user?.profile_Picture?.url
                                  ? comment?.user?.profile_Picture?.url
                                  : user6
                              }
                              alt="userimg"
                              className="avatar-48 rounded-circle img-fluid"
                              loading="lazy"
                            />
                          </div>
                          <div className="comment-list-user-data">
                            <div className="d-inline-flex align-items-center gap-1 flex-wrap">
                              <h6 className="m-0">{comment?.user?.name}</h6>
                              <span className="d-inline-block text-primary">
                                <svg
                                  className="align-text-bottom"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  height="17"
                                  viewBox="0 0 17 17"
                                  fill="none"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.2483 0.216553H4.75081C2.13805 0.216553 0.5 2.0665 0.5 4.68444V11.7487C0.5 14.3666 2.13027 16.2166 4.75081 16.2166H12.2475C14.8689 16.2166 16.5 14.3666 16.5 11.7487V4.68444C16.5 2.0665 14.8689 0.216553 12.2483 0.216553Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M5.5 8.21627L7.50056 10.216L11.5 6.21655"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="comment-list-user-comment">
                          <div className="comment-list-comment">
                            {comment?.comment}
                          </div>
                          <div className="comment-list-action mt-2">
                            <ul className="list-inline m-0 p-0 d-flex align-items-center gap-2">
                              <li>
                                <div className="like-block position-relative d-flex align-items-center flex-shrink-0">
                                  <div className="like-data"></div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}

              <div className="add-comment-form-block">
                <div className="d-flex align-items-center gap-3">
                  <div className="flex-shrink-0">
                    <img
                      src={user1}
                      alt="userimg"
                      className="avatar-48 rounded-circle img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <div className="add-comment-form">
                    <form onSubmit={handleCommentSubmit}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Write a Comment..."
                        value={Comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        // onClick={handleCommentSubmit}
                        type="submit"
                        className="btn btn-primary font-size-12 text-capitalize px-5"
                      >
                        post
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </Card.Body>
    </Card>
    </Col>
    </Row>
  );
};

export default Post;
