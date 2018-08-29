import { PlanAip } from './plan';
import { MainLife } from './mainlife';

export class QuoAipReq{
    mainLife : MainLife;
    plan : PlanAip;
    constructor(mainLife : MainLife, plan : PlanAip){
        this.mainLife=mainLife;
        this.plan=plan;
    }
}