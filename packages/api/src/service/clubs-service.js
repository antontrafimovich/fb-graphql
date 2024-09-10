export default {
  getClubById: async (user, db, id) => {
    if (!user) {
        throw new Error("You are not authenticated!");
    }
    
    return db.get("clubs").find({ id }).value();
  },
};
