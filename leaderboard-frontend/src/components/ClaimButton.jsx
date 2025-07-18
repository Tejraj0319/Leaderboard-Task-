import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ClaimButton = ({ selectedUser, setSelectedUser, onPointsClaimed }) => {
  const [isClaiming, setIsClaiming] = useState(false);

  const claimPoints = async () => {
    if (!selectedUser || !selectedUser._id) {
      alert("Please select a user to claim points.");
      return;
    }

    setIsClaiming(true);

    try {
      const response = await axiosInstance.post("/claim", {
        userId: selectedUser._id,
      });

      const updatedUser = response.data?.data?.user;

      setSelectedUser(null);

      if (typeof onPointsClaimed === "function") {
        await onPointsClaimed(updatedUser);
      }
    } catch (error) {
      console.error("Error claiming points:", error);
      alert("Failed to claim points. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <button
      onClick={claimPoints}
      disabled={isClaiming}
      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-orange-400 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 mb-4 cursor-pointer"
    >
      {isClaiming ? "Claiming..." : "Claim Points"}
    </button>
  );
};

export default ClaimButton;




