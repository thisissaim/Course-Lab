import axios from "axios";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    aadhar: null,
    mobile: null,
    address: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation(); //hook
  const navigate = useNavigate();

  const employeeId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8800/employees/${employeeId}`,
        employee
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update Employee Information</h1>
      <input
        type="text"
        placeholder="Name of the Employee"
        name="name"
        onChange={handleChange}
      />
      <br></br>
      <input
        type="text"
        placeholder="Department Name"
        name="department"
        onChange={handleChange}
      />
      <br></br>

      <input  placeholder="12-Digit-Aadhar Card" type="text" maxlength="12" pattern="\d{12}" title="Please enter exactly 12 digits" />
      <br></br>

      <input  placeholder="10-Digit-Mobile Number" type="text" maxlength="10" pattern="\d{10}" title="Please enter exactly 10 digits" />
      <br></br>

      <input
        type="text"
        placeholder="Address"
        name="address"
        onChange={handleChange}
      />
      <br></br>

      <button className="button" onClick={handleClick}>
        Update
      </button>
      {error && "Something went wrong!"}
      <br></br>
      <div className="see">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>See all employees</Link>
      </div>
    </div>
  );
};

export default Update;
