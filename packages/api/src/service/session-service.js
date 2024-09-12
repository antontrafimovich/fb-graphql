export default {
  getSessionByUserId: async (db, userId) => {
    return db.sessions.getSessionByUserId(userId);
  },

  createSession: async (db, userId) => {
    return db.sessions.createSession(userId);
  },

  getUserBySession: async (db, sessionId) => {
    const session = await db.sessions.getSessionById(sessionId);
    if (!session) {
      return null;
    }

    return db.users.getUserById(session.userId);
  },
};
