import WalletRepository from "../repositories/collectionrepo.js";
import WalletLedgerRepository from "../repositories/collectionledgerrepo.js";

class WalletService {

  constructor() {
    this.walletRepository = new WalletRepository();
    this.ledgerRepository = new WalletLedgerRepository();
  }

  credit(userId, amount) {
    const wallet = this.walletRepository.findByUserId(userId);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    wallet.withdrawableBalance += amount;

    this.walletRepository.update(wallet);
  }

  debit(userId, amount) {
    const wallet = this.walletRepository.findByUserId(userId);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    if (wallet.withdrawableBalance < amount) {
      throw new Error("Insufficient balance");
    }

    wallet.withdrawableBalance -= amount;

    this.walletRepository.update(wallet);
  }

  getWallet(userId) {
    return this.walletRepository.findByUserId(userId);
  }
}

export default WalletService;