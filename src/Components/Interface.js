import React, { useState, useEffect } from 'react';
import './Interface.css'; 
import axios from 'axios';
const Interface = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
                );
                setUserData(response.data); // Set the fetched data to the state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // State for search input
    const [searchTerm, setSearchTerm] = useState('');
    const [editedData, setEditedData] = useState({});
    const [searchTerm1, setSearchTerm1] = useState();
    // State for selected rows
    const [selectedRows, setSelectedRows] = useState([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [editingRows, setEditingRows] = useState([]);
    const rowsPerPage = 10;

    // Filtered and paginated data based on search term
    const filteredData = userData.filter(user =>
        Object.values(user).some(value =>
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

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleSelectAll = () => {
        setSelectedRows((prevSelected) =>
            prevSelected.length === paginatedData.length ? [] : [...paginatedData.map((user) => user.id)]
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
        setSelectedRows((prevSelected) => prevSelected.filter((rowId) => rowId !== id));
    };

    const handleEditRow = (id) => {
        setEditingRows((prevEditing) => [...prevEditing, id]);
        setEditedData(userData.find(user => user.id === id));
    };

    const handleSaveRow = (id) => {
        setEditingRows((prevEditing) => prevEditing.filter(rowId => rowId !== id));
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

    const hasNextPage = currentPage < Math.ceil(filteredData.length / rowsPerPage);
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);


    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Search..."
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm1}
                        onChange={(e) => setSearchTerm1(e.target.value)}
                        onKeyPress={(e) => (e.key === 'Enter' ? handleSearch() : console.log("wrong key press"))}
                    />
                    <button className="search-icon" onClick={handleSearch}>Search</button>
                </div>
                <button style={{marginBottom:"12px"}} className="delete-selected" onClick={handleDeleteSelected}>Delete Selected <img style={{ height: "10px", paddingLeft:"5px",marginTop:"5px"}} src={process.env.PUBLIC_URL + '/Icons/bin.png'} alt="Delete" /></button>
            </div>
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
                <tbody>
                    {paginatedData.map((user) => (
                        <tr
                            key={user.id}
                            style={{
                                color: selectedRows.includes(user.id) ? '#0000ff' : '#000000', // Highlight selected rows
                            }}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(user.id)}
                                    onChange={() => handleSelectRow(user.id)}
                                />
                            </td>
                            <td>{user.id}</td>
                            <td>
                                {editingRows.includes(user.id) ? (
                                    <input
                                        type="text"
                                        value={editedData.name}
                                        onChange={(e) => handleEditInputChange(e, 'name')}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingRows.includes(user.id) ? (
                                    <input
                                        type="text"
                                        value={editedData.email}
                                        onChange={(e) => handleEditInputChange(e, 'email')}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingRows.includes(user.id) ? (
                                    <input
                                        type="text"
                                        value={editedData.role}
                                        onChange={(e) => handleEditInputChange(e, 'role')}
                                    />
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editingRows.includes(user.id) ? (
                                    <button className="save" onClick={() => handleSaveRow(user.id)}>
                                        <img style={{ height: '20px' }} src={process.env.PUBLIC_URL + '/Icons/check.png'} alt="Save" />
                                    </button>
                                ) : (
                                    <button className="edit" onClick={() => handleEditRow(user.id)}>
                                        <img style={{ height: '20px' }} src={process.env.PUBLIC_URL + '/Icons/edit.png'} alt="Edit" />
                                    </button>
                                )}
                                <button className="delete" onClick={() => handleDeleteRow(user.id)}>
                                    <img style={{ height: '20px' }} src={process.env.PUBLIC_URL + '/Icons/bin.png'} alt="Delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {/* Display selected rows count */}
           <div style={{ marginTop: '10px', color: '#808080', textAlign: 'left' }}>
               {`Selected ${selectedRows.length} out of ${filteredData.length} rows`}
           </div>
            <div className="pagination">
                <div style={{ padding: "5px" }}>

                    Page {currentPage} of {totalPages}
                </div>
                <button className="first-page" onClick={() => handlePageChange(1)}>First Page</button>
                <button className="previous-page" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>

                {/* Display buttons for each page */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            borderColor: currentPage === index + 1 ? '#000' : '#808080', // Set border color for selected and other pages
                            color: currentPage === index + 1 ? '#000' : '#808080', // Set text color for selected and other pages
                            fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}


                <button className="next-page" onClick={() => handlePageChange(currentPage + 1)} disabled={!hasNextPage}>Next Page</button>
                <button className="last-page" onClick={() => handlePageChange(totalPages)}>Last Page</button>
            </div>



            {/* <button className="delete-selected" onClick={handleDeleteSelected}>Delete Selected</button> */}
        </div>
    );
};

export default Interface;
