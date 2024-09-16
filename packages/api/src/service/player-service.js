export default {
  getPlayerByName: async (user, db, name) => {
    if (!user) {
      throw new Error("Access denied");
    }

    return db.players.getPlayer(name);
  },
  getPlayers: async (user, db) => {
    if (!user) {
      throw new Error("Access denied");
    }

    return db.players.getPlayers(user);
  },
};
