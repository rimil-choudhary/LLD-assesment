import database from "../database/data.js";

class WalletRepository {

  save(wallet) {
    database.wallets.set(wallet.userId, wallet);
  }

  findByUserId(userId) {
    return database.wallets.get(userId);
  }

  findAll() {
    return [...database.wallets.values()];
  }

  exists(userId) {
    return database.wallets.has(userId);
  }

  update(wallet) {
    database.wallets.set(wallet.userId, wallet);
  }

}

export default WalletRepository;