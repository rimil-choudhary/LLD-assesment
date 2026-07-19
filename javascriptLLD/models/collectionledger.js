import { LedgerType } from "../config/status.js";

class WalletLedger {
  constructor(
    id,
    userId,
    amount,
    type,
    saleId = null,
    payoutId = null
  ) {
    this.id = id;
    this.userId = userId;

    this.saleId = saleId;

    this.payoutId = payoutId;

    this.amount = amount;

    this.type = type;

    this.createdAt = new Date();
  }
}

export default WalletLedger;