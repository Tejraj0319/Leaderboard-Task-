import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import axiosInstance from "../api/axiosInstance";

const UserSelector = ({ selectedUser, setSelectedUser }) => {
  const [defaultOptions, setDefaultOptions] = useState([]);

  // Format user to react-select option
  const toOption = (user) => ({
    label: `${user.name} (${user.totalPoints} pts)`,
    value: user._id,
    user,
  });

  // Load top 10 users initially
  const loadDefaultUsers = async () => {
    try {
      const res = await axiosInstance.get("/leaderboard", {
        params: {
          limit: 10,
          page: 1,
        },
      });

      const users = res?.data?.data?.users || [];
      const options = users.map(toOption);
      setDefaultOptions(options);
    } catch (error) {
      console.error("Error fetching default leaderboard users:", error);
    }
  };

  useEffect(() => {
    loadDefaultUsers();
  }, []);

  // Called when user types
  const loadOptions = async (inputValue) => {
    try {
      const res = await axiosInstance.get("/leaderboard", {
        params: {
          search: inputValue,
          limit: 10,
        },
      });

      const users = res?.data?.data?.users || [];
      return users.map(toOption);
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Select User</label>
      <AsyncSelect
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        onChange={(option) => setSelectedUser(option?.user || null)}
        value={selectedUser ? toOption(selectedUser) : null}
        placeholder="Search or select user..."
        className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-sm"
      />
    </div>
  );
};

export default UserSelector;
