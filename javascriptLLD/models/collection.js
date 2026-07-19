class Wallet {
  constructor(userId) {
    this.userId = userId;
    this.withdrawableBalance = 0;
    this.lockedBalance = 0;
    this.lastWithdrawalAt = null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export default Wallet;
