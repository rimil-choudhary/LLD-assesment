import AdvancePayoutService from "../services/payservice.js";
import ReconciliationService from "../services/recoverservice.js";
class SaleController {
    constructor(){
        this.advanceService =
            new AdvancePayoutService();
        this.reconciliationService =
            new ReconciliationService();
    }
    processAdvancePayout(){
        this.advanceService.processAdvancePayouts();
        return{
            success:true,
            message:"Advance payout completed"
        };
    }
    reconcileSale(saleId,status){
        this.reconciliationService
            .reconcileSale(saleId,status);
        return{
            success:true,
            message:"Sale reconciled"
        };
    }
}
export default SaleController;
