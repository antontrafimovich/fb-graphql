export default {
  getUserById: (db, id) => {
    return db.users.getUserById(id);
  },

  getUserByEmail: (db, email) => {
    return db.users.getUserByEmail(email);
  },
};
