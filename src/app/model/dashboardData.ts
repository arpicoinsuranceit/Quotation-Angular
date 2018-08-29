export class MainRespDto{

    nopCount : number;
    monthlyTarget : MonthlyTarget = new MonthlyTarget;

    monthlyTargetGWP : MonthlyTarget = new MonthlyTarget;
    monthlyTargetMCFP : MonthlyTarget = new MonthlyTarget;
    monthlyTargetFYP : MonthlyTarget = new MonthlyTarget;
    monthlyTargetNOP : MonthlyTarget = new MonthlyTarget;
    
    yearlyTarget : NameSeriasPair[] =new Array;
    YearlyTargetCF : NameSeriasPair[] =new Array;

    extra : NameSeriasPair[] =new Array; 

    nop : NameSeriasPair[] =new Array;
    mcfp : NameSeriasPair[] =new Array;
    fyp : NameSeriasPair[] =new Array;
    gwp : NameSeriasPair[] =new Array;
    riny1 : NameSeriasPair[] =new Array;
    cf : NameSeriasPair[] =new Array;

    nopC : NameSeriasPair[] =new Array;
    mcfpC : NameSeriasPair[] =new Array;
    fypC : NameSeriasPair[] =new Array;
    gwpC : NameSeriasPair[] =new Array;
    cfC : NameSeriasPair[] =new Array;


    policySummery : NameValuePair[] = new Array;

    ic : Top3[] =new Array;
    is : Top3[] =new Array;
    ul : Top3[] =new Array;
    branch : Top3[] =new Array;
    region : Top3[] =new Array;
    zone : Top3[] =new Array;

    pendingPolList : PendingPol []= new Array;
    duePolicieList : DuePolicies[] = new Array;
}


export class MonthlyTarget{
    actual : number = 0;
    target : number = 0;
    targetExpand : number = 0;
}

export  class NameValuePair{
    name : string ="";
    value : number = 0;
}

export class NameSeriasPair{
    name : string ="";
    series : NameValuePair[] = new Array;
}

export class Top3{
    name : string = "";
    code : string = "";
    url : string = "";
}

export class DuePolicies{
    branch : string = "";
    polNum : string = "";
    custName : string = "";
    premium : number = 0;
    arias : number = 0;
}

export class PendingPol{
    branch : string = "";
    propNo : string = "";
    agentCode : string = "";
    proposal : number = 0;
    custName : string = "";
    req : string = "";

}