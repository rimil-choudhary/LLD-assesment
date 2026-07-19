import { SaleStatus } from "../config/status.js";
class Sale {
  constructor(id, userId, brandId, earning) {
    this.id = id;
    this.userId = userId;
    this.brandId = brandId;
    this.earning = earning;
    this.status = SaleStatus.PENDING;
    this.advancePaid = false;
    this.advancePaidAmount = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
export default Sale;
