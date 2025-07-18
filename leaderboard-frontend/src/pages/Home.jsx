import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Leaderboard from "../components/Leaderboard";
import AddUserForm from "../components/AddUserForm";
import UserSelector from "../components/UserSelector";
import ClaimButton from "../components/ClaimButton";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (pageNum = 1) => {
    try {
      const res = await axiosInstance.get(`/leaderboard?page=${pageNum}`);
      const fetchedUsers = Array.isArray(res.data.data?.users)
        ? res.data.data.users
        : [];

      setUsers(fetchedUsers);
      setPage(res.data.data.pagination.page);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  const handleClaimPoints = async (userId) => {
    try {
      await axiosInstance.post(`/leaderboard/claim/${userId}`);
      await fetchUsers(page); // Refresh leaderboard
    } catch (err) {
      console.error("Error claiming points", err);
    }
  };

  const handleUserAdded = () => {
    fetchUsers(page);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-600 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Leaderboard</h1>

      {/* Add New User */}
      <AddUserForm onUserAdded={handleUserAdded} />

      {/* User Selector Dropdown */}
      <UserSelector
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      {/* Claim Button */}
      {selectedUser && (
        <ClaimButton
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onPointsClaimed={() => fetchUsers(page)}
        />
      )}

      {/* Leaderboard */}
      <Leaderboard
        users={users}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        onClaim={handleClaimPoints}
      />
    </div>
  );
};

export default Home;
