import database from "../database/data.js";

class UserRepository {

  save(user) {
    database.users.set(user.id, user);
  }

  findById(userId) {
    return database.users.get(userId);
  }

  findAll() {
    return [...database.users.values()];
  }

  exists(userId) {
    return database.users.has(userId);
  }

  delete(userId) {
    database.users.delete(userId);
  }

}

export default UserRepository;