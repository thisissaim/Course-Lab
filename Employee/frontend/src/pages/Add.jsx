import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    aadhar: null,
    mobile: null,
    address: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));//spread
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/employees", employee);//connects backend
      navigate("/");//navigates to home page
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Employee</h1>
      <input
        type="text"
        placeholder="Name of the Employee"
        name="name"
        onChange={handleChange}
      />
      <br></br>
      <input
        rows={2}
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
        rows={5}
        type="text"
        placeholder="Address"
        name="address"
        onChange={handleChange}
      />
       <br></br>
      
      <button className="button " onClick={handleClick}>Add</button>
      <br></br>
      {error && "Something went wrong!"}
      <div className="see">
      <Link to="/"style={{ color: "inherit", textDecoration: "none" }}>See all employees</Link>
      </div>
    </div>
  );
};

export default Add;