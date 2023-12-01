// Interface.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDataTable from "./UserDataTable";
import SearchAndDelete from "./SearchAndDelete";
import Pagination from "./Pagination";
import "./Interface.css";

const Interface = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setUserData(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [editedData, setEditedData] = useState({});
  const [searchTerm1, setSearchTerm1] = useState();
  // State for selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState([]);
  const rowsPerPage = 10;

  // Filtered and paginated data based on search term
  const filteredData = userData.filter((user) =>
    Object.values(user).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle functions
  const handleSearch = () => {
    setSearchTerm(searchTerm1);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    setSelectedRows((prevSelected) =>
      prevSelected.length === paginatedData.length
        ? []
        : [...paginatedData.map((user) => user.id)]
    );
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleDeleteSelected = () => {
    setUserData((prevData) =>
      prevData.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  };

  const handleDeleteRow = (id) => {
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
    setSelectedRows((prevSelected) =>
      prevSelected.filter((rowId) => rowId !== id)
    );
  };

  const handleEditRow = (id) => {
    setEditingRows((prevEditing) => [...prevEditing, id]);
    setEditedData(userData.find((user) => user.id === id));
  };

  const handleSaveRow = (id) => {
    setEditingRows((prevEditing) =>
      prevEditing.filter((rowId) => rowId !== id)
    );
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, ...editedData } : user
      )
    );
    setEditedData({});
  };

  const handleEditInputChange = (e, key) => {
    const { value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [key]: value }));
  };

  const hasNextPage =
    currentPage < Math.ceil(filteredData.length / rowsPerPage);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="container">
      <SearchAndDelete
        searchTerm1={searchTerm1}
        handleSearch={handleSearch}
        handleDeleteSelected={handleDeleteSelected}
        setSearchTerm1={setSearchTerm1}
      />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === paginatedData.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <UserDataTable
          paginatedData={paginatedData}
          selectedRows={selectedRows}
          editingRows={editingRows}
          handleSelectRow={handleSelectRow}
          handleEditInputChange={handleEditInputChange}
          handleSaveRow={handleSaveRow}
          handleEditRow={handleEditRow}
          handleDeleteRow={handleDeleteRow}
          editedData={editedData}
        />
      </table>
      <div style={{ marginTop: "10px", color: "#808080", textAlign: "left" }}>
        {`Selected ${selectedRows.length} out of ${filteredData.length} rows`}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default Interface;
