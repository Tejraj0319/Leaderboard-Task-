import { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import axiosInstance from "../api/axiosInstance"
import { Crown, Trophy, Star, Gift, Users } from "lucide-react"

const Leaderboard = forwardRef((props, ref) => {
  const [leaderboard, setLeaderboard] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLeaderboard = async (pageNum = page) => {
    try {
      const res = await axiosInstance.get(`/leaderboard?page=${pageNum}`)
      setLeaderboard(res.data.data.users)
      setPage(res.data.data.pagination.page)
      setTotalPages(res.data.data.pagination.totalPages)
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err)
    }
  }

  // Expose fetchLeaderboard method to parent using ref
  useImperativeHandle(ref, () => ({
    refreshLeaderboard: () => fetchLeaderboard(),
  }))

  useEffect(() => {
    fetchLeaderboard(page)
  }, [page])
  const handlePrevious = () => {
    if (page > 1) fetchLeaderboard(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) fetchLeaderboard(page + 1)
  }

  const formatPoints = (points) => points.toLocaleString()

  const getRankBadgeColor = (position) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-orange-500"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600"
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600"
    }
  }

  const getProfileBorder = (position) => {
    switch (position) {
      case 1:
        return "ring-4 ring-yellow-400 ring-offset-4 ring-offset-white"
      case 2:
        return "ring-4 ring-gray-400 ring-offset-4 ring-offset-white"
      case 3:
        return "ring-4 ring-amber-500 ring-offset-4 ring-offset-white"
      default:
        return ""
    }
  }

  const getGlobalPosition = (index) => (page - 1) * 10 + index + 1

  const getRandomAvatar = (name, size = 80) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=${size}`

  const topThree = leaderboard.filter((_, index) => getGlobalPosition(index) <= 3)
  const remainingUsers = leaderboard.filter((_, index) => getGlobalPosition(index) > 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-sm border-b border-white/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Live Ranking</h1>
            <div className="text-sm text-gray-700 bg-white/30 px-3 py-1 rounded-full">
              Settlement time 2 days 01:45:41
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button className="flex items-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              <Trophy className="w-4 h-4 text-yellow-600" />
              Contribution
            </button>
            <button className="flex items-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              <Star className="w-4 h-4 text-purple-600" />
              Star tasks
            </button>
            <button className="flex items-center gap-2 bg-white/80 hover:bg-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
              <Gift className="w-4 h-4 text-red-600" />
              Rewards
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Top 3 Users */}
        {topThree.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 mb-6 shadow-xl">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {topThree.map((user, index) => {
                const position = getGlobalPosition(index)
                return (
                  <div key={user._id} className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={getRandomAvatar(user.name, 80)}
                        alt={user.name}
                        className={`w-20 h-20 rounded-full mx-auto object-cover ${getProfileBorder(position)}`}
                      />
                      <div
                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full ${getRankBadgeColor(position)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                      >
                        {position}
                      </div>
                      {position === 1 && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <Crown className="w-6 h-6 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1 truncate">{user.name}</h3>
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
                      <span className="text-lg font-bold text-gray-800">{formatPoints(user.totalPoints)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Remaining Users */}
        {remainingUsers.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="space-y-3">
              {remainingUsers.map((user, index) => {
                const position = getGlobalPosition(index + topThree.length)
                return (
                  <div key={user._id} className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {position}
                      </div>
                      <img
                        src={getRandomAvatar(user.name, 40)}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{user.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{formatPoints(user.totalPoints)}</span>
                      <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* No users message */}
        {leaderboard.length === 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-xl">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No users found on this page</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
          <button
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 ${
              page === 1 ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
            onClick={handlePrevious}
            disabled={page === 1}
          >
            Previous
          </button>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700 font-medium">Page {page} of {totalPages}</span>
          </div>
          <button
            className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
})

export default Leaderboard
