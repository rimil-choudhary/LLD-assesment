import database from "../database/data.js";
import { PayoutStatus } from "../config/status.js";

class PayoutRepository {

  save(payout) {
    database.payouts.set(payout.id, payout);
  }

  findById(id) {
    return database.payouts.get(id);
  }

  findAll() {
    return [...database.payouts.values()];
  }

  findByUserId(userId) {
    return [...database.payouts.values()].filter(
      payout => payout.userId === userId
    );
  }

  findByStatus(status) {
    return [...database.payouts.values()].filter(
      payout => payout.status === status
    );
  }

  findFailedPayouts() {
    return [...database.payouts.values()].filter(
      payout =>
        payout.status === PayoutStatus.FAILED ||
        payout.status === PayoutStatus.REJECTED ||
        payout.status === PayoutStatus.CANCELLED
    );
  }

  update(payout) {
    payout.updatedAt = new Date();
    database.payouts.set(payout.id, payout);
  }

}

export default PayoutRepository;