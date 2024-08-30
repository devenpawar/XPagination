import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeTable.css";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]); // Full employee data
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [employeesPerPage] = useState(10); // Employees to display per page

  const fetchEmployee = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      alert("failed to fetch data");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // Get current employees
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

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
      <Pagination
        employeesPerPage={employeesPerPage}
        totalEmployees={employees.length}
        paginate={paginate}
        currentPage={currentPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
};

const Pagination = ({
  employeesPerPage,
  totalEmployees,
  paginate,
  currentPage,
  handlePreviousPage,
  handleNextPage,
}) => {
  const totalPages = Math.ceil(totalEmployees / employeesPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="page-link"
          >
            Previous
          </button>
        </li>
        <li className="page-number" stye>
          <span>{currentPage}</span>
        </li>
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default EmployeeTable;
