import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [Searchemployees, setSearchEmployees] = useState([]);
  const [filterVal, setfilterVal] = useState("");

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:8800/employees");
        setEmployees(res.data);
        setSearchEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmployees();
  }, []);

  console.log(employees);
  const handleFilter = (e) => {
    
    if (e.target.value == "") {
      
      setEmployees(setSearchEmployees);
    } else {
      e.preventDefault();
      const filterResult = Searchemployees.filter(
        (item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.department
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.mobile.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setEmployees(filterResult);
      } else {
        setEmployees([
          { name: "No Employee by this name" },
          { department: "No such dept. employee" },
          { mobile: "No such linked mobile no." },
        ]);
      }
    }
    setfilterVal(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/employees/" + id); //send id
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class ="a1">
      <h1>Employee Manager</h1>
      <button className="button addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new employee
        </Link>
      </button>
      <div>
        <input
          type="search"
          placeholder="Search by Name, Dept. or Mobile"
          value={filterVal}
          onInput={(e) => handleFilter(e)}
        />
      </div>

      <div className="employees card">
        {employees.map((employee) => (
          <div key={employee.id} className="employee container">
            <div className="inner">

            <h3> {employee.name}</h3>
            <p>Department: {employee.department}</p>
            <span>Aadhar Number: {employee.aadhar}</span>
            <br></br> <br></br>
            <span>Mobile Number: {employee.mobile}</span>
            <p>Address: {employee.address}</p>
            </div>
            <button
              className="button delete"
              onClick={() => handleDelete(employee.id)}
            >
              Delete Employee Info
            </button>
            <button className="button update">
              <Link
                to={`/update/${employee.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update employee information
              </Link>
            </button>
          </div>
        ))}
      </div>

      {/* <button className="button addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new employee
        </Link>
      </button> */}
    </div>
  );
};

export default Employees;
