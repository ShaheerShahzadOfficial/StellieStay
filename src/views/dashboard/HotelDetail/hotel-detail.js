import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import imgm1 from "../../../assets/images/market/1.png";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ApiLink } from "../../../store/setting/reducers";

const HotelDetail = () => {
  const { id } = useParams();

  const [HotelDetail, setHotelDetail] = useState();

  useEffect(() => {
    (async () => {
      await axios(`${ApiLink}/hotel/get-Accomudation/${id}`)
        .then((result) => {
          console.log(result.data.accomudation,'result.data.accomudation')
          setHotelDetail(result.data.accomudation);
        })
        .catch((error) => {
          console.log(error.response.data || error);
        });
    })();
  }, []);

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
            <p>
             {HotelDetail?.HotelDescription}
            </p>
            <div className="mt-2"></div>
            <span className="text-warning d-block line-height mt-0">
              <span className="text-warning d-flex align-items-center mt-2">
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 me-1">star</i>
                <i className="material-symbols-outlined md-18 text-gray me-1">star</i>
                <small className="text-dark me-1">{HotelDetail?.rating?.length}</small>
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

                  <small className="text-dark me-1">{HotelDetail?.Size} {" "} sq</small>
                </span>
              </span>

              <span className="text-warning d-flex align-items-center mt-2">
                <li class="material-symbols-outlined">credit_card</li>

                <small className="text-dark me-1">Card</small>
              </span>

              {HotelDetail?.Wifi && <span className="text-warning d-flex align-items-center mt-2">
                <li class="material-symbols-outlined">wifi</li>

                <small className="text-dark me-1">Wifi</small>
              </span>}
            </div>

            <Link className="features" to={"/chat/index"}>
              Contact Now
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HotelDetail;
