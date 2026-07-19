import {PayoutType, PayoutStatus,} from "../config/status.js";
class Payout {
  constructor(
    id,
    userId,
    amount,
    type,
    saleId = null
  ) {
    this.id = id;
    this.userId = userId;
    this.saleId = saleId;
    this.amount = amount;
    this.type = type;
    this.status = PayoutStatus.PENDING;
    this.failureReason = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export default Payout;
