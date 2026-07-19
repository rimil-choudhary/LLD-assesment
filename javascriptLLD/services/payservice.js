import SaleRepository from "../repositories/salerepo.js";
import PayoutRepository from "../repositories/payrepo.js";

import WalletService from "./collectionservice.js";

import Payout from "../models/pay.js";

import {
  PayoutType,
  PayoutStatus,
} from "../config/constants.js";

class AdvancePayoutService {

  constructor() {
    this.saleRepository = new SaleRepository();

    this.walletService = new WalletService();

    this.payoutRepository = new PayoutRepository();
  }

  processAdvancePayouts() {

    const sales =
      this.saleRepository.findEligibleForAdvancePayout();

    for (const sale of sales) {

      const advanceAmount =
        sale.earning * 0.10;

      this.walletService.credit(
        sale.userId,
        advanceAmount
      );

      const payout =
        new Payout(
          Date.now(),
          sale.userId,
          advanceAmount,
          PayoutType.ADVANCE,
          sale.id
        );

      payout.status =
        PayoutStatus.SUCCESS;

      this.payoutRepository.save(payout);

      sale.advancePaid = true;

      sale.advancePaidAmount =
        advanceAmount;

      this.saleRepository.update(sale);

    }

  }

}

export default AdvancePayoutService;