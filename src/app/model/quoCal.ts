import { Children } from "./childeren";
import { Benifict } from "./benificts";


export class QuotationCalculation {
    _product: string;
    _personalInfo: CalPersonalInfo;
    _riderDetails: RiderDetails;
    
}

export class CalPersonalInfo {
    mdob: string;
    mgenger: string;
    mocu: string;
    sdob: string;
    sgenger: string;
    socu: string;
    childrens: Children[];
    frequance: string;
    bsa: number;
    term : number;
    mage : number;
    sage : number;
    payingterm : string;
    msfb: number;
    mPreviousSumAtRisk  :number;
    sPreviousSumAtRisk : number;
    age  : number;
    pensionPaingTerm : number;
    retAge : number;
}

export class RiderDetails{
    _mRiders: Benifict[] = new Array();
    _sRiders: any;
    _cRiders: any;
}


export class CalPersonalInfoArp {
    mdob: string;
    mgenger: string;
    mocu: string;
    sdob: string;
    sgenger: string;
    socu: string;
    childrens: Children[];
    frequance: string;
    bsa: number;
    term : number;
    payingterm : number;
}


export class CalPersonalInfoDta {
    mdob: string;
    mgenger: string;
    mocu: string;
    sdob: string;
    sgenger: string;
    socu: string;
    frequance: string;
    bsa: number;
    term : number;
    msfb : number;
    intrate : number;
}

export class QuotationDtaCalculation {
    _personalInfoDta: CalPersonalInfoDta;
    _riderDetails: RiderDetails;
    
}



export class AibSummery {
    extraOe: number;
    maturaty: number;
    maturaty10: number;
    maturaty12: number;
  }
  
  