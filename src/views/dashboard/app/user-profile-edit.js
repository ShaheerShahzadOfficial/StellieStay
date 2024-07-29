import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Form,
  Button,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";

//image
import img1 from "../../../assets/images/user/11.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ApiLink, loadUser } from "../../../store/setting/reducers";

const UserProfileEdit = () => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name);
  const [Language, setLanguage] = useState(user?.Language);
  const [gender, setGender] = useState(user?.gender);
  const [DOB, setDOB] = useState(user?.DOB);
  const [age, setAge] = useState(user?.age);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [country, setCountry] = useState(user?.country);
  const [city, setCity] = useState(user?.city);
  const [Bio, setBio] = useState(user?.Bio);
  const [profile, setProfile] = useState(user?.profile_Picture?.url || "");
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [VerifyPassword, setVerifyPassword] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    setName(user?.name);
    setLanguage(user?.Language);
    setGender(user?.gender);
    setDOB(user?.DOB);
    setAge(user?.age);
    setPhoneNumber(user?.phoneNumber);
    setCountry(user?.country);
    setCity(user?.city);
    setBio(user?.Bio);
    setProfile(user?.profile_Picture?.url);
  }, [user]);

  const handleFileChange = (e) => {
    // const selectedFile = e.target.files[0];
    // if (selectedFile) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(selectedFile);
    //   reader.onloadend = () => {
    //     setFile(reader.result);
    //   };
    // }

    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index];
      const Reader = new FileReader();
      Reader.readAsDataURL(file);

      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setProfile(Reader.result);
        }
      };
    }
  };

  const editProfile = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    await axios
      .put(
        `${ApiLink}/user/updateProfile`,
        {
          name,
          Language,
          gender,
          DOB,
          age,
          phoneNumber,
          country,
          city,
          Bio,
          CoverPhoto: "",
          profile,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(({ data }) => {
        dispatch(loadUser());
        console.log("data ========>", data);
      });
  };
  const changePassword = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="content-inner">
        <Container>
          <Tab.Container defaultActiveKey="first">
            <Row>
              <Col lg="12">
                <Card>
                  <Card.Body className="p-0">
                    <div>
                      <Nav
                        as="ul"
                        variant="pills"
                        className="iq-edit-profile row mb-0 align-items-center justify-content-center"
                      >
                        <Nav.Item as="li" className="col-md-6 p-0">
                          <Nav.Link eventKey="first" role="button">
                            Personal Information
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li" className="col-md-6 p-0">
                          <Nav.Link eventKey="second" role="button">
                            Change Password
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={12}>
                {/* <div className="iq-edit-list-data"> */}
                <Tab.Content>
                  <Tab.Pane eventKey="first" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <div className="header-title">
                          <h4 className="card-title">Personal Information</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group className="form-group align-items-center">
                            <Col md="12">
                              <div className="profile-img-edit">
                                <img
                                  className="profile-pic"
                                  src={profile ? profile : img1}
                                  alt="profile-pic"
                                />
                                <label htmlFor="upload">
                                  <div className="p-image d-flex align-items-center justify-content-center">
                                    <span className="material-symbols-outlined">
                                      edit
                                    </span>
                                    <input
                                      className="file-upload"
                                      type="file"
                                      accept="image/*"
                                      id="upload"
                                      multiple={false}
                                      onChange={handleFileChange}
                                    />
                                  </div>
                                </label>
                              </div>
                            </Col>
                          </Form.Group>
                          <Row className="align-items-center">
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label
                                htmlFor="fname"
                                className="form-label"
                              >
                                Name:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="fname"
                                placeholder="Jan"
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label
                                htmlFor="fname"
                                className="form-label"
                              >
                                Language:
                              </Form.Label>
                              <Form.Control
                                type="text"
                                value={Language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="form-control"
                                id="Language"
                                placeholder="Language"
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label d-block">
                                Gender:
                              </Form.Label>
                              <Form.Check className="form-check form-check-inline">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio11"
                                  defaultValue="Male"
                                  value={gender}
                                  checked={gender === "Male"}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="inlineRadio11"
                                >
                                  {" "}
                                  Male
                                </Form.Check.Label>
                              </Form.Check>
                              <Form.Check className="form-check form-check-inline">
                                <Form.Check.Input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio11"
                                  defaultValue="Female"
                                  checked={gender === "Female"}
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                />
                                <Form.Check.Label
                                  className="form-check-label"
                                  htmlFor="inlineRadio11"
                                >
                                  {" "}
                                  Female
                                </Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label htmlFor="dob" className="form-label">
                                Date Of Birth:
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                value={DOB}
                                onChange={(e) => setDOB(e.target.value)}
                                id="dob"
                                type="date"
                                placeholder="1984-01-24"
                              />
                            </Form.Group>
                            {/* <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label">
                                Marital Status:
                              </Form.Label>
                              <Form.Select
                                defaultValue="Single"
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>
                                <option>Divorced</option>
                                <option>Separated </option>
                              </Form.Select>
                            </Form.Group> */}
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label">
                                Age:
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                id="dob"
                                type="number"
                                placeholder="18"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label">
                                Phone Number:
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                id="phoneNumber"
                                type="number"
                                placeholder="(010) 30202020"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label">
                                Country:
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                id="dob"
                                type="text"
                                placeholder="USA"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              />
                            </Form.Group>
                            <Form.Group className="form-group col-sm-6">
                              <Form.Label className="form-label">
                                City:
                              </Form.Label>
                              <Form.Control
                                className="form-control"
                                id="dob"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Florida"
                              />
                            </Form.Group>

                            <Form.Group className="form-group col-sm-12">
                              <Form.Label className="form-label">
                                Bio:
                              </Form.Label>
                              <textarea
                                className="form-control"
                                value={Bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={5}
                                style={{ lineHeight: "22px" }}
                              />
                            </Form.Group>
                          </Row>
                          <Button
                            onClick={editProfile}
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Submit
                          </Button>
                          {/* <Button
                            type="reset"
                            variant=""
                            className="btn-danger-subtle"
                          >
                            Cancel
                          </Button> */}
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second" className="fade show">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <div className="iq-header-title">
                          <h4 className="card-title">Change Password</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Form>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="cpass" className="form-label">
                              Current Password:
                            </Form.Label>
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="cpass"
                              value={OldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="npass" className="form-label">
                              New Password:
                            </Form.Label>
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="npass"
                              value={NewPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group className="form-group">
                            <Form.Label htmlFor="vpass" className="form-label">
                              Verify Password:
                            </Form.Label>
                            <Form.Control
                              type="Password"
                              className="form-control"
                              id="vpass"
                              value={VerifyPassword}
                              onChange={(e) =>
                                setVerifyPassword(e.target.value)
                              }
                            />
                          </Form.Group>
                          <Button
                            onClick={changePassword}
                            type="submit"
                            className="btn btn-primary me-2"
                          >
                            Submit
                          </Button>{" "}
                          <button
                            type="reset"
                            className="btn btn-danger-subtle"
                          >
                            Cancel
                          </button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
                {/* </div> */}
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};

export default UserProfileEdit;
