import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";

import imgm1 from "../../../assets/images/market/1.png";
import imgm2 from "../../../assets/images/market/2.png";
import imgm3 from "../../../assets/images/market/8.png";
import imgm4 from "../../../assets/images/market/3.png";
import imgm5 from "../../../assets/images/market/5.png";
import imgm6 from "../../../assets/images/market/9.png";
import imgm7 from "../../../assets/images/market/7.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AccomudationState,
  get_Accomudation_Async,
} from "../../../store/setting/reducers";
const Market1 = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(AccomudationState);
  useEffect(() => {
    dispatch(get_Accomudation_Async());
  }, [dispatch]);
  return (
    <>
      <div id="content-page" className="content-inner">
        <Container>
          <Row>
            <div className="mb-2">
              <h4>Hotels For Accumodation</h4>
            </div>
            {data?.map((accomudation, i) => (
              <Col sm="6" md="4">
                <Card className="cardhover" key={i}>
                  <Card.Body>
                    <img
                      src={accomudation?.HotelImages[0]?.url}
                      alt={accomudation?.HotelName}
                      className="avatar  job-icon mb-3 d-inline-block"
                      style={{ borderRadius: 20 }}
                      loading="lazy"
                      width={"100%"}
                      height={300}
                    />
                    <h5>{accomudation?.HotelName}</h5>
                    <small>
                      {accomudation?.Address}, {accomudation?.city}
                    </small>
                    <div className="mt-2"></div>
                    <span className="text-warning d-block line-height mt-0">
                      <span className="text-warning d-flex align-items-center mt-2">
                        <i className="material-symbols-outlined md-18 me-1">
                          star
                        </i>
                        <i className="material-symbols-outlined md-18 me-1">
                          star
                        </i>
                        <i className="material-symbols-outlined md-18 me-1">
                          star
                        </i>
                        <i className="material-symbols-outlined md-18 me-1">
                          star
                        </i>
                        <i className="material-symbols-outlined md-18 text-gray me-1">
                          star
                        </i>
                        <small className="text-dark me-1">
                          {accomudation?.rating?.length}
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
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                      className="my-2"
                    >
                      <span className="text-warning d-block line-height mt-0">
                        <span className="text-warning d-flex align-items-center mt-2">
                          <li className="material-symbols-outlined">
                            design_services
                          </li>

                          <small className="text-dark me-1">
                            {accomudation?.Size} sq
                          </small>
                        </span>
                      </span>

                      {accomudation?.CreditCard && (
                        <span className="text-warning d-flex align-items-center mt-2">
                          <li className="material-symbols-outlined">
                            credit_card
                          </li>

                          <small className="text-dark me-1">Card</small>
                        </span>
                      )}

                      {accomudation?.Wifi && (
                        <span className="text-warning d-flex align-items-center mt-2">
                          <li className="material-symbols-outlined">wifi</li>

                          <small className="text-dark me-1">Wifi</small>
                        </span>
                      )}
                    </div>

                    <Link
                      to={`/dashboards/hotel-detail/${accomudation?._id}`}
                      className="detailBtn"
                    >
                      Detail
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {/* <Col sm="6" md="4">
              <Card className="cardhover">
                <Card.Body>
                  <img
                    loading="lazy"
                    src={imgm2}
                    alt="mimg"
                    className="avatar avatar-50 job-icon mb-3 d-inline-block"
                  />
                  <h5>Google Calendar</h5>
                  <small>Built by HubSpot</small>
                  <div className="mt-2">
                    <p className="mb-0">
                      Bring HubSpot to your inbox with the HubSpot integration
                      for Gmail.
                    </p>
                  </div>
                  <span className="text-warning d-block line-height mt-0">
                    <span className="text-warning d-flex align-items-center mt-2">
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 text-gray me-1">
                        star
                      </i>
                      <small className="text-dark me-1">189</small>
                    </span>
                    <small>
                      <span>
                        <span>10,000</span>+ installs
                      </span>
                    </small>
                  </span>
                </Card.Body>
              </Card>
            </Col>
            <Col sm="6" md="4">
              <Card className="cardhover">
                <Card.Body>
                  <img
                    loading="lazy"
                    src={imgm3}
                    alt="mimg"
                    className="avatar avatar-50 job-icon mb-3 d-inline-block"
                  />
                  <h5>HubSpot for WordPress</h5>
                  <small>Built by HubSpot</small>
                  <div className="mt-2">
                    <p className="mb-0">
                      Integrate HubSpot's lead capture and contact management
                      with WordPress
                    </p>
                  </div>
                  <span className="text-warning d-block line-height mt-0">
                    <span className="text-warning d-flex align-items-center mt-2">
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 me-1">
                        star
                      </i>
                      <i className="material-symbols-outlined md-18 text-gray me-1">
                        star
                      </i>
                      <small className="text-dark me-1">61</small>
                    </span>
                    <small>
                      <span>
                        <span>10,000</span>+ installs
                      </span>
                    </small>
                  </span>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Market1;
