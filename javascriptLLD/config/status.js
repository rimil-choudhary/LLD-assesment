export const SaleStatus = Object.freeze({
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
});
export const PayoutType = Object.freeze({
  ADVANCE: "ADVANCE",
  FINAL: "FINAL",
  WITHDRAWAL: "WITHDRAWAL",
});
export const PayoutStatus = Object.freeze({
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
});
export const LedgerType = Object.freeze({
  ADVANCE_CREDIT: "ADVANCE_CREDIT",
  FINAL_CREDIT: "FINAL_CREDIT",
  ADVANCE_DEBIT: "ADVANCE_DEBIT",
  WITHDRAWAL: "WITHDRAWAL",
  FAILED_RECOVERY: "FAILED_RECOVERY",
});
