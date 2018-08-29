import { Plan, PlanArp, PlanDta } from './plan';
import { Children } from './childeren';
import { Spouse } from './spouse';
import { MainLife } from './mainlife';

export class personalInfo {

    _mainlife: MainLife;
    _spouse: Spouse;
    _childrenList;
    _plan = new Plan;

    constructor(mainLife: MainLife, spouse: Spouse, childrens, plan: Plan) {
        this._mainlife = mainLife;
        this._spouse = spouse;
        this._childrenList = childrens;
        this._plan = plan;
    }
}


export class personalInfoDTA {

    _mainlife: MainLife;
    _spouse: Spouse;
    _plan = new PlanDta;

    constructor(mainLife: MainLife, spouse: Spouse, plan: PlanDta) {
        this._mainlife = mainLife;
        this._spouse = spouse;
        this._plan = plan;
    }
}