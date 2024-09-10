export default {
  getUserById: async (db, id) => {
    return db.users.getUserById(id);
  },
};
