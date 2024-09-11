import sessionService from "./session-service.js";
import userService from "./user-service.js";

export default {
  login: async (db, { email, password }) => {
    const user = await userService.getUserByEmail(db, email);
    if (!user) {
      return null;
    }

    if (user.password !== password) {
      return null;
    }

    const activeSession = await sessionService.getSessionByUserId(db, user.id);

    if (activeSession) {
      return activeSession.id;
    }

    const session = await sessionService.createSession(db, user.id);

    return session.id;
  },
};
