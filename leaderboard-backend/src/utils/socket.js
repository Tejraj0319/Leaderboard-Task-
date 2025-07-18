let io;

module.exports = {
  setIO: (serverInstance) => {
    io = serverInstance;
  },
  getIO: () => {
    if (!io) throw new Error("Socket.IO not initialized!");
    return io;
  },
};
