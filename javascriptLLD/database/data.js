class InMemoryDatabase {
  constructor() {
    this.users = new Map();
    this.wallets = new Map();
    this.sales = new Map();
    this.payouts = new Map();
    this.walletLedgers = new Map();
  }
}
const database = new InMemoryDatabase();
export default database;
