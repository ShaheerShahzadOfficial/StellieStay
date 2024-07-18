import React from "react";
import { Container } from "react-bootstrap";
import imgm1 from "../../../assets/images/market/1.png";
import { Link } from "react-router-dom";

const HotelDetail = () => {
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
            <img
              src={imgm1}
              alt="mimg"
              className="avatar mb-3 d-inline-block m-2"
              loading="lazy"
              width={400}
              height={400}
            />

            <img
              src={imgm1}
              alt="mimg"
              className="avatar mb-3 d-inline-block m-2"
              loading="lazy"
              width={"400px"}
              height={"400px"}
            />

            <img
              src={imgm1}
              alt="mimg"
              className="avatar mb-3 d-inline-block m-2"
              loading="lazy"
              width={400}
              height={400}
            />
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
            <div className="features">
              <p>FEATURED</p>
            </div>
            <h1>Montana Hotel</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
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
                <small className="text-dark me-1">400</small>
              </span>
            </span>
            <div className="mt-2"></div>
            {/* <span className="text-warning d-block line-height mt-0">
                  <li class="material-symbols-outlined">design_services</li>
                  <small>200sq</small>
                  </span> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "20%",
              }}
              className="my-2"
            >
              <span className="text-warning d-block line-height mt-0">
                <span className="text-warning d-flex align-items-center mt-2">
                  <li class="material-symbols-outlined">design_services</li>

                  <small className="text-dark me-1">200sq</small>
                </span>
              </span>

              <span className="text-warning d-flex align-items-center mt-2">
                <li class="material-symbols-outlined">credit_card</li>

                <small className="text-dark me-1">Card</small>
              </span>

              <span className="text-warning d-flex align-items-center mt-2">
                <li class="material-symbols-outlined">wifi</li>

                <small className="text-dark me-1">Wifi</small>
              </span>
            </div>

            <Link className="features" to={'/chat/index'}>Contact Now</Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetail;
