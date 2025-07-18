import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/", { name });
      const newUser = res?.data?.data;
      onUserAdded(newUser);
      setName("");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Something went wrong while adding the user.");
    }
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="mb-4 flex items-center gap-3 bg-gray-100 p-3 rounded-lg shadow-sm"
  >
    <input
      type="text"
      placeholder="Enter your name"
      className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <button
      type="submit"
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 active:scale-95 transition font-medium text-sm"
    >
      Add
    </button>
  </form>
);


};

export default AddUserForm;
