import React, { useEffect, useState } from "react";
import "./NomePage.css";

export default function NomePage() {
  // fetch school data
  const [sclData, setSclData] = useState({});

  //show data in display
  const [showdata, setShowData] = useState("");

  // user input state
  const [userInputStudentId, setUserInputStudentId] = useState("");

  // user input state
  const [userInputStudentIdAdminDate, setUserInputStudentIdAdminDate] =
    useState("");

  // useEffect for Student info
  useEffect(() => {
    // for fetch student id
    fetch("https://rony9843.github.io/demojsonapi/sample2.json")
      .then((response) => response.json())
      .then((json) => {
        setSclData(json);

        //      console.log("this is data : ", json);
      });
  }, []);

  // user input function
  const userInput = (props) => {
    setUserInputStudentId(props);
  };

  const [position, setPosition] = useState({});

  const componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position);
    });
  };

  componentDidMount();

  // user submit btn
  const userSubmitBtn = () => {
    // console.log("this is data :", sclData);
    // const findData = sclData.find((element) => element.Studentid === 21311);
    // console.log("this is findData :", findData);

    console.log("this is submit btn : ", position);

    const filnalData = {
      userInputStudentId: userInputStudentId,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    };

    console.log("filnalData ", filnalData);

    fetch("https://sclwebserver.herokuapp.com/PostUserId", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filnalData }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    const intData = parseInt(userInputStudentId);

    let obj = sclData.find((o) => o.Studentid === intData);

    console.log("this is filter data  : ", obj === undefined);

    let idValue = obj === undefined;

    if (idValue === true) {
      console.log("errorrrrrrrrrr");
      setShowData("error");
    } else {
      const AdminDate = obj.AdminDate;
      const EditAdminDate = AdminDate.split(" ");
      let finalEditAdminDate = EditAdminDate[0];
      setUserInputStudentIdAdminDate(finalEditAdminDate);
      setShowData(obj);
    }
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key

    if (e.keyCode === 13) {
      console.log("this is value : ", userInputStudentId);
      userSubmitBtn();
    }
  };

  return (
    <div>
      <div className="w-100">
        <div
          className="main-background-class-with-scrollbar p-2"
          style={{
            width: "90%",
            backgroundColor: "#F2F6FD",
            border: "2px solid #8C61FF",
            height: "95vh",
            margin: " 20px auto",
            overflow: "auto",
            borderRadius: "10px",
            boxShadow: "0 3px 7px #8c61ff",
          }}
        >
          <div className="w-100 ">
            <div
              className="bottomleft"
              style={{
                fontSize: "18px",
              }}
            >
              <div className="input-group mb-3 p-2 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Student's ID..."
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  onChange={(e) => userInput(e.target.value)}
                  onKeyUp={handleKeypress}
                />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#8C61FF",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                  type="button"
                  id="button-addon2"
                  onClick={() => userSubmitBtn()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {showdata.StudentName != null ? (
            <div>
              <h1
                className=""
                style={{
                  fontSize: "25px",
                  color: "#775DCE",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Student Info...
              </h1>
              <h6 style={{ color: "red" }}>
                This information in not from this year.
              </h6>

              <div className="data-list">
                <span className="data-list-span">Student Name : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.StudentName}
                </span>
              </div>
              <div className="data-list" style={{ backgroundColor: "#e6eaff" }}>
                <span className="data-list-span">Student ID : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.Studentid}
                </span>
              </div>
              <div className="data-list">
                <span className="data-list-span">BirthDate : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.BirthDate.split(" ", 1)}
                </span>
              </div>
              <div className="data-list">
                <span className="data-list-span">Age : </span>{" "}
                <span className="data-list-user-info">{showdata.Age}</span>
              </div>
              <div className="data-list">
                <span className="data-list-span">Sex : </span>{" "}
                <span className="data-list-user-info">{showdata.Sex}</span>
              </div>
              <div className="data-list">
                <span className="data-list-span">Religion : </span>{" "}
                <span className="data-list-user-info">{showdata.Religion}</span>
              </div>
              <div className="data-list">
                <span className="data-list-span">Nationality : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.Nationality}
                </span>
              </div>

              {showdata.BloodGroup === "0" ||
              showdata.BloodGroup === null ||
              showdata.BloodGroup === 0 ||
              showdata.BloodGroup === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Blood Group : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.BloodGroup}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Blood Group : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.BloodGroup}
                  </span>
                </div>
              )}

              <div className="data-list">
                <span className="data-list-span">ChildNo : </span>{" "}
                <span className="data-list-user-info">{showdata.ChildNo}</span>
              </div>

              <div className="data-list">
                <span className="data-list-span">Admin Date : </span>{" "}
                <span className="data-list-user-info">
                  {userInputStudentIdAdminDate}
                </span>
              </div>

              {showdata.ClassCode === "0" ||
              showdata.ClassCode === null ||
              showdata.ClassCode === 0 ||
              showdata.ClassCode === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Class Code: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ClassCode}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Class Code: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ClassCode}
                  </span>
                </div>
              )}

              {showdata.ClassSection === "0" ||
              showdata.ClassSection === null ||
              showdata.ClassSection === 0 ||
              showdata.ClassSection === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Class Section: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ClassSection}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Class Section: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ClassSection}
                  </span>
                </div>
              )}
              {showdata.RollNo === "0" ||
              showdata.RollNo === null ||
              showdata.RollNo === 0 ||
              showdata.RollNo === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Roll No : </span>{" "}
                  <span className="data-list-user-info">{showdata.RollNo}</span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Roll No : </span>{" "}
                  <span className="data-list-user-info">{showdata.RollNo}</span>
                </div>
              )}

              {showdata.MEDIUM === "0" ||
              showdata.MEDIUM === null ||
              showdata.MEDIUM === 0 ||
              showdata.MEDIUM === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">MEDIUM : </span>{" "}
                  <span className="data-list-user-info">{showdata.MEDIUM}</span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">MEDIUM : </span>{" "}
                  <span className="data-list-user-info">{showdata.MEDIUM}</span>
                </div>
              )}
              <div className="data-list">
                <span className="data-list-span">Academic Year : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.AcademicYear}
                </span>
              </div>

              {showdata.HomeTel === "0" ||
              showdata.HomeTel === 0 ||
              showdata.HomeTel === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Home Tel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.HomeTel}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Home Tel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.HomeTel}
                  </span>
                </div>
              )}

              {showdata.EmergencyTel === "0" ||
              showdata.EmergencyTel === 0 ||
              showdata.EmergencyTel === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Emergency Tel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.EmergencyTel}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Emergency Tel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.EmergencyTel}
                  </span>
                </div>
              )}
              {showdata.SpecialNote === "0" ||
              showdata.SpecialNote === null ||
              showdata.SpecialNote === 0 ||
              showdata.SpecialNote === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Special Note: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.SpecialNote}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Special Note : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.SpecialNote}
                  </span>
                </div>
              )}

              {showdata.SiblingForMidium === "0" ||
              showdata.SiblingForMidium === null ||
              showdata.SiblingForMidium === 0 ||
              showdata.SiblingForMidium === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Sibling For Midium : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.SiblingForMidium}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Sibling For Midium : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.SiblingForMidium}
                  </span>
                </div>
              )}

              {showdata.BusAreaCode === "0" ||
              showdata.BusAreaCode === null ||
              showdata.BusAreaCode === 0 ||
              showdata.BusAreaCode === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Bus Area Code : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.BusAreaCode}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Bus Area Code: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.BusAreaCode}
                  </span>
                </div>
              )}

              {showdata.Admission === "0" ||
              showdata.Admission === null ||
              showdata.Admission === 0 ||
              showdata.Admission === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Admission : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.Admission}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Admission : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.Admission}
                  </span>
                </div>
              )}
              <div className="data-list">
                <span className="data-list-span">Guardian Name : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.GuardianName}
                </span>
              </div>
              {showdata.MotherName === "0" ||
              showdata.MotherName === null ||
              showdata.MotherName === 0 ||
              showdata.MotherName === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Mother's Name : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.MotherName}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Mother's Name : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.MotherName}
                  </span>
                </div>
              )}

              <div className="data-list">
                <span className="data-list-span">Guardian Code : </span>{" "}
                <span className="data-list-user-info">
                  {showdata.GuardianCode}
                </span>
              </div>

              <div className="data-list">
                <span className="data-list-span">Docno : </span>{" "}
                <span className="data-list-user-info">{showdata.Docno}</span>
              </div>

              {showdata.Occupation === "0" ||
              showdata.Occupation === 0 ||
              showdata.Occupation === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Occupation : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.Occupation}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Occupation : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.Occupation}
                  </span>
                </div>
              )}
              {showdata.CompanyName === "0" ||
              showdata.CompanyName === 0 ||
              showdata.CompanyName === "" ? (
                <div style={{ display: "none" }}>
                  <span style={{ display: "none" }} className="data-list-span">
                    Company Name :{" "}
                  </span>{" "}
                  <span
                    style={{ display: "none" }}
                    className="data-list-user-info"
                  >
                    etrfew
                    {showdata.CompanyName}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Company Name : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.CompanyName}
                  </span>
                </div>
              )}

              {showdata.CompanyTel === "0" ||
              showdata.CompanyTel === 0 ||
              showdata.CompanyTel === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">CompanyTel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.CompanyTel}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">CompanyTel : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.CompanyTel}
                  </span>
                </div>
              )}

              {showdata.HomeAdress === "0" ||
              showdata.HomeAdress === 0 ||
              showdata.HomeAdress === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Home Address : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.HomeAdress}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Home Address : </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.HomeAdress}
                  </span>
                </div>
              )}
              {showdata.Dist === "0" ||
              showdata.Dist === 0 ||
              showdata.Dist === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Home Districts : </span>{" "}
                  <span className="data-list-user-info">{showdata.Dist}</span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Home Districts : </span>{" "}
                  <span className="data-list-user-info">{showdata.Dist}</span>
                </div>
              )}
              {showdata.ParmanentAddress === "0" ||
              showdata.ParmanentAddress === null ||
              showdata.ParmanentAddress === 0 ||
              showdata.ParmanentAddress === "" ? (
                <div style={{ display: "none" }} className="data-list">
                  <span className="data-list-span">Parmanent Address: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ParmanentAddress}
                  </span>
                </div>
              ) : (
                <div className="data-list">
                  <span className="data-list-span">Parmanent Address: </span>{" "}
                  <span className="data-list-user-info">
                    {showdata.ParmanentAddress}
                  </span>
                </div>
              )}
            </div>
          ) : showdata === "error" ? (
            <div>
              <div class="d-flex justify-content-center">
                <div>
                  <h2 className=" mt-5 fs-5" style={{ fontFamily: "Poppins" }}>
                    we don't find any information about this
                    <strong style={{ color: "#775DCE", marginLeft: "3px" }}>
                      Student's ID : {userInputStudentId}
                    </strong>
                  </h2>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                {" "}
                <h2
                  className="p-4 mt-5 p-5 fs-5"
                  style={{ fontFamily: "Poppins" }}
                >
                  <strong
                    style={{ color: "rgb(206 93 144)", marginLeft: "3px" }}
                  >
                    Only For BISCR
                  </strong>
                </h2>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="p-4 mt-5 fs-5" style={{ fontFamily: "Poppins" }}>
                Please,enter the{" "}
                <strong style={{ color: "#775DCE" }}>Student ID</strong>
              </h2>

              <div class="d-flex justify-content-center">
                <h2
                  className=" mt-5 pt-5 fs-5"
                  style={{ fontFamily: "Poppins" }}
                >
                  <strong style={{ color: "rgb(206 93 144)" }}>
                    Only For BISCR
                  </strong>
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
