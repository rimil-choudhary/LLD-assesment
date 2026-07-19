import WalletRepository from "../repositories/collectionrepo.js";
import PayoutRepository from "../repositories/payrepo.js";

import WalletService from "./collectionservice.js";

import Payout from "../models/pay.js";

import {
  PayoutType,
  PayoutStatus,
} from "../config/constants.js";

class WithdrawalService {

  constructor() {

    this.walletRepository =
      new WalletRepository();

    this.walletService =
      new WalletService();

    this.payoutRepository =
      new PayoutRepository();

  }

  withdraw(
    userId,
    amount
  ) {

    const wallet =
      this.walletRepository.findByUserId(
        userId
      );

    if (!wallet)
      throw new Error(
        "Wallet not found"
      );

    if (
      wallet.lastWithdrawalAt
    ) {

      const diff =
        new Date() -
        wallet.lastWithdrawalAt;

      if (
        diff <
        24 * 60 * 60 * 1000
      ) {

        throw new Error(
          "Only one withdrawal allowed every 24 hours"
        );

      }

    }

    if (
      wallet.withdrawableBalance <
      amount
    ) {

      throw new Error(
        "Insufficient balance"
      );

    }

    wallet.withdrawableBalance -= amount;

    wallet.lockedBalance += amount;

    wallet.lastWithdrawalAt =
      new Date();

    this.walletRepository.update(
      wallet
    );

    const payout =
      new Payout(
        Date.now(),
        userId,
        amount,
        PayoutType.WITHDRAWAL
      );

    payout.status =
      PayoutStatus.PENDING;

    this.payoutRepository.save(
      payout
    );

    return payout;

  }

}

export default WithdrawalService;