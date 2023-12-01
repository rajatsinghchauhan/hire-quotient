// UserDataTable.js
import React from "react";

const UserDataTable = ({
  paginatedData,
  selectedRows,
  editingRows,
  handleSelectRow,
  handleEditInputChange,
  handleSaveRow,
  handleEditRow,
  handleDeleteRow,
  editedData,
}) => (
  <tbody>
    {paginatedData.map((user) => (
      <tr
        key={user.id}
        style={{
          color: selectedRows.includes(user.id) ? "#0000ff" : "#000000", // Highlight selected rows
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
              onChange={(e) => handleEditInputChange(e, "name")}
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
              onChange={(e) => handleEditInputChange(e, "email")}
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
              onChange={(e) => handleEditInputChange(e, "role")}
            />
          ) : (
            user.role
          )}
        </td>
        <td>
          {editingRows.includes(user.id) ? (
            <button className="save" onClick={() => handleSaveRow(user.id)}>
              <img
                style={{ height: "20px" }}
                src={process.env.PUBLIC_URL + "/Icons/check.png"}
                alt="Save"
              />
            </button>
          ) : (
            <button className="edit" onClick={() => handleEditRow(user.id)}>
              <img
                style={{ height: "20px" }}
                src={process.env.PUBLIC_URL + "/Icons/edit.png"}
                alt="Edit"
              />
            </button>
          )}
          <button className="delete" onClick={() => handleDeleteRow(user.id)}>
            <img
              style={{ height: "20px" }}
              src={process.env.PUBLIC_URL + "/Icons/bin.png"}
              alt="Delete"
            />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);

export default UserDataTable;
