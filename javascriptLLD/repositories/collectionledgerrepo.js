import database from "../database/data.js";

class WalletLedgerRepository {

  save(entry) {
    database.walletLedgers.set(entry.id, entry);
  }

  findById(id) {
    return database.walletLedgers.get(id);
  }

  findAll() {
    return [...database.walletLedgers.values()];
  }

  findByUserId(userId) {
    return [...database.walletLedgers.values()].filter(
      entry => entry.userId === userId
    );
  }

  findBySaleId(saleId) {
    return [...database.walletLedgers.values()].filter(
      entry => entry.saleId === saleId
    );
  }

  findByPayoutId(payoutId) {
    return [...database.walletLedgers.values()].filter(
      entry => entry.payoutId === payoutId
    );
  }

}

export default WalletLedgerRepository;