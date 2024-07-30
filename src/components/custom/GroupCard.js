import React from "react";
import { Card } from "react-bootstrap";
import { ApiLink } from "../../store/setting/reducers";
import axios from "axios";
import img1 from "../../assets/images/page-img/profile-bg1.jpg";
import gi1 from "../../assets/images/page-img/gi-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GroupCard = ({ item }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const navigateTOGroup = () => {
    navigate(`/dashboards/app/group-detail/${item?._id}`);
  };
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
    <Card className="group-box mb-0">
      <div className="top-bg-image">
        <img
          src={item?.GroupBanner?.url ? item?.GroupBanner?.url : img1}
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
            to={
              item?.users?.includes(user?._id)
                ? `/dashboards/app/group-detail/${item?._id}`
                : "#"
            }
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

        {item?.Admin !== user?._id ? (
          <button
            onClick={() => joinGroup(item._id)}
            type="submit"
            className="btn btn-primary-subtle fw-semibold px-3"
          >
            {item?.users?.includes(user?._id) ? "Leave Group" : " Join Group"}
          </button>
        ) : (
          <button
            onClick={navigateTOGroup}
            type="submit"
            className="btn btn-primary-subtle fw-semibold px-3"
          >
            View Group
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

export default GroupCard;
