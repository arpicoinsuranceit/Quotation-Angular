import { Children } from './childeren';
import { Spouse } from './spouse';
import { Plan } from "./plan";
import { MainLife } from "./mainlife";

export class QuotationView{
    productCode : string;
    productName : string;
    quoDetailId : number;
    quotationId : number;
    seqId : number;
    quotationDate : Date;
    _mainlife : MainLife;
    _spouse : Spouse;
    _children : Children[];
    _plan : Plan;
	_mainLifeBenefits : QuoBenf[];
	_spouseBenefits : QuoBenf[];
    _childrenBenefits : QuoChildBenef[];
  
    constructor( productCode : string,
        productName : string,
        quotationId : number,
        quoDetailId : number,
        quotationDate : Date,
        _mainlife : MainLife,
        _spouse : Spouse,
        _children : Children[],
        _plan : Plan,
        _mainLifeBenefits : QuoBenf[],
        _spouseBenefits : QuoBenf[],
        _childrenBenefits : QuoChildBenef[]){

            this.quoDetailId=quoDetailId;
            this.productName=productName;
            this.quotationId=quotationId;
            this.productCode=productCode;
            this.quotationDate=quotationDate;
            this._mainlife=_mainlife;
            this._spouse=_spouse;
            this._children=_children;
            this._plan=_plan;
            this._mainLifeBenefits=_mainLifeBenefits;
            this._spouseBenefits=_spouseBenefits;
            this._childrenBenefits=_childrenBenefits;

    }
}

export class QuoCustomer{
    mainLifeName : string;
	mainLifeAge : number;
	mainLifeOccupation : string;
	spouseName : string;
    spouseAge : number;
    spouseOccupation : string;
    term : number;
    mode : string;
    modePremium : number;

    constructor(mainLifeName : string,
        mainLifeAge : number,
        mainLifeOccupation : string,
        spouseName : string,
        spouseAge : number,
        spouseOccupation : string,
        term : number,
        mode : string,
        modePremium : number){

            this.mainLifeAge=mainLifeAge;
            this.mainLifeOccupation=mainLifeOccupation;
            this.mainLifeAge=mainLifeAge;
            this.spouseName=spouseName;
            this.spouseAge=spouseAge;
            this.spouseOccupation=spouseOccupation;
            this.term=term;
            this.mode=mode;
            this.modePremium=modePremium;

    }
}

export class QuoBenf{
    benfName : string;
    riderTerm : number;
	riderSum : number;
    premium : number;
    riderCode : string;

    constructor(benfName : string,
        riderTerm : number,
        riderSum : number,
        premium : number,
        riderCode : string){

            this.benfName=benfName;
            this.riderTerm=riderTerm;
            this.riderSum=riderSum;
            this.premium=premium;
            this.riderCode = riderCode;
        
    }
}

export class Child{
    childId : number;
	childName : string;
    childNic : string;
    childDob : Date;
	childGender : string;
    childRelation : string;

    constructor(childId : number,
        childName : string,
        childNic : string,
        childDob : Date,
        childGender : string,
        childRelation : string){

            this.childId=childId;
            this.childName=childName;
            this.childNic=childNic;
            this.childDob=childDob;
            this.childGender=childGender;
            this.childRelation=childRelation;

    }
}

export class QuoChildBenef{
    child : Child;
    benfs : QuoBenf[];
    
    constructor(child : Child,
        benfs : QuoBenf[]){

            this.child=child;
            this.benfs=benfs;
    }
}