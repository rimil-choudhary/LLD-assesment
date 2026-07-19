import database from "../database/data.js";
import { SaleStatus } from "../config/status.js";

class SaleRepository {

  save(sale) {
    database.sales.set(sale.id, sale);
  }

  findById(saleId) {
    return database.sales.get(saleId);
  }

  findAll() {
    return [...database.sales.values()];
  }

  findByUserId(userId) {
    return [...database.sales.values()].filter(
      sale => sale.userId === userId
    );
  }

  findPendingSales() {
    return [...database.sales.values()].filter(
      sale => sale.status === SaleStatus.PENDING
    );
  }

  findEligibleForAdvancePayout() {
    return [...database.sales.values()].filter(
      sale =>
        sale.status === SaleStatus.PENDING &&
        !sale.advancePaid
    );
  }

  update(sale) {
    sale.updatedAt = new Date();
    database.sales.set(sale.id, sale);
  }

}

export default SaleRepository;