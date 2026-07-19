import SaleRepository from "../repositories/salerepo.js";
import PayoutRepository from "../repositories/payrepo.js";

import WalletService from "./collectionservice.js";

import Payout from "../models/pay.js";

import {
  SaleStatus,
  PayoutType,
  PayoutStatus,
} from "../config/constants.js";

class ReconciliationService {

  constructor() {

    this.saleRepository =
      new SaleRepository();

    this.walletService =
      new WalletService();

    this.payoutRepository =
      new PayoutRepository();

  }

  reconcileSale(
    saleId,
    newStatus
  ) {

    const sale =
      this.saleRepository.findById(
        saleId
      );

    if (!sale) {
      throw new Error("Sale not found");
    }

    sale.status = newStatus;

    if (
      newStatus === SaleStatus.APPROVED
    ) {

      const remainingAmount =
        sale.earning -
        sale.advancePaidAmount;

      this.walletService.credit(
        sale.userId,
        remainingAmount
      );

      const payout =
        new Payout(
          Date.now(),
          sale.userId,
          remainingAmount,
          PayoutType.FINAL,
          sale.id
        );

      payout.status =
        PayoutStatus.SUCCESS;

      this.payoutRepository.save(
        payout
      );

    }

    if (
      newStatus === SaleStatus.REJECTED
    ) {

      this.walletService.debit(
        sale.userId,
        sale.advancePaidAmount
      );

    }

    this.saleRepository.update(
      sale
    );

  }

}

export default ReconciliationService;