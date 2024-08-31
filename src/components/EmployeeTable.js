import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]); // Full employee data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const employeesPerPage = 10; // Employees to display per page

  const fetchEmployee = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      alert("Failed to fetch data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // Calculate the employees to display on the current page
  const getPaginatedEmployees = () => {
    const start = (currentPage - 1) * employeesPerPage;
    const end = start + employeesPerPage;
    return employees.slice(start, end);
  };

  // Handlers for Previous and Next buttons
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(employees.length / employeesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentEmployees = getPaginatedEmployees();

  return (
    <div className="table-container" style={{ margin: "1rem" }}>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="page-link"
        >
          Previous
        </button>
        <span className="page-number">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentEmployees.length < employeesPerPage}
          className="page-link"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
