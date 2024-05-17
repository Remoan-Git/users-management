import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { customTableStyles } from "../assets/dataTableStyles";
import axios from "axios";
import LoadingSpinner from "../assets/loadingSpinner";
import { useNavigate } from "react-router-dom";

function DisplayUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);


  const handleDeleteUser = (userId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (shouldDelete) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            dispatch({ type: "DELETE_USER", payload: userId });
          } else {
            console.error("Failed to delete user:", response.status);
            alert("Unable To Delete User Please Try again !");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("Unable To Delete User Please Try again !");
        });
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row) => row.website,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="table-delete-btn"
          onClick={() => handleDeleteUser(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="irish">Users</h1>
      {users.length > 0 ? (
        <DataTable
          title={
            <div className="table-head">
              <button
                onClick={() => navigate("/users/add")}
                className="link-button"
              >
                {" "}
                <b>Add User</b>
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => navigate("/users/update")}
                className="link-button"
              >
                {" "}
                <b>Update Users</b>
              </button>
            </div>
          }
          customStyles={customTableStyles}
          columns={columns}
          data={users}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[]}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default DisplayUsers;
