export default {
  getSessionByUserId: async (db, userId) => {
    return db.sessions.getSessionByUserId(userId);
  },

  createSession: async (db, userId) => {
    return db.sessions.createSession(userId);
  },
};
