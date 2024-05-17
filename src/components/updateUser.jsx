import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const isUsersFetched = useSelector((state) => state.isUsersFetched);

  useEffect(() => {
    if (!isUsersFetched) {
      dispatch({ type: "FETCH_USERS" });
    }
  }, [dispatch, isUsersFetched]);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const validationErrors = {};
    if (!formData.userId) {
      validationErrors.userId = "User selection is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!/^\d{10,15}$/.test(formData.phone)) {
      validationErrors.phone = "Invalid phone number format (10 to 15 numbers)";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${formData.userId}`,
        {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
        }
      );

      dispatch({ type: "UPDATE_USER", payload: response.data });

      setFormData({
        userId: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      });

   
      setErrors({});

      setIsSubmitting(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      setIsSubmitting(false);
      alert("Failed To Update User Please Try Again !");
    }
  };

  const handleSelectChange = (e) => {
    const userId = e.target.value;

    const selectedUser = users.find((user) => user.id === parseInt(userId));

    setFormData({
      ...formData,
      userId: userId,
      name: selectedUser.name,
      username: selectedUser.username,
      email: selectedUser.email,
      phone: selectedUser.phone,
      website: selectedUser.website,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1 className="irish" style={{ margin: "1rem" }}>
        Update User
      </h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="field-container">
          <select
            name="userId"
            value={formData.userId}
            onChange={handleSelectChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && <p className="error">{errors.userId}</p>}
        </div>
        <div className="field-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="field-container">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="field-container">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="field-container">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="field-container">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating User..." : "Update User"}
        </button>
        <span>
          <Link className="form-link" to="/users">
            Go Back To Users List
          </Link>
        </span>
      </form>
    </div>
  );
};

export default UpdateUser;
