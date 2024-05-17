import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Invalid email addreess";
    }
    if (!formData.phone.trim()) {
      validationErrors.phone = "Phone is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      validationErrors.phone = "Invalid phone number format (10 to 15 numbers)";
    }
    if (!formData.website.trim()) {
      validationErrors.website = "Website is required";
    } else if (!/^https?:\/\/\S+$/.test(formData.website)) {
      validationErrors.website = "Invalid website URL";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    axios
      .post("https://jsonplaceholder.typicode.com/users", formData)
      .then((response) => {
        dispatch({ type: "ADD_USER", payload: response.data });
        alert("User added successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);

        setFormData({
          name: "",
          username: "",
          email: "",
          phone: "",
          website: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Failed To Add User Please Try Again !");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <h1 className="irish">Add a User</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="field-container">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="field-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="field-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="field-container">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="field-container">
          <label htmlFor="website">Website:</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className={errors.website ? "input-error" : ""}
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit User"}
        </button>
        <span>
          <Link className="form-link" to="/users">
            Go Back To Users List
          </Link>
        </span>
      </form>
    </>
  );
};

export default AddUser;
