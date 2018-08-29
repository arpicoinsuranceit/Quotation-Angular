export class AipCalSchedule{
    policyYear : number;
	policyMonth : number;
	openingFee : number;
	comCon  :number;
	fundAmt : number;
	fndBfi : number;
	intAmt : number;
	fndBmf : number;
	mgtFee : number;
	fndClo : number;
    adbCov : number;
    
    constructor(policyYear : number,
        policyMonth : number,
        openingFee : number,
        comCon  :number,
        fundAmt : number,
        fndBfi : number,
        intAmt : number,
        fndBmf : number,
        mgtFee : number,
        fndClo : number,
        adbCov : number){
            this.policyYear=policyYear;
            this.policyMonth=policyMonth;
            this.openingFee=openingFee;
            this.comCon=comCon;
            this.fundAmt=fundAmt;
            this.fndBfi=fndBfi;
            this.intAmt=intAmt;
            this.fndBmf=fndBmf;
            this.mgtFee=mgtFee;
            this.fndClo=fndClo;
            this.adbCov=adbCov;

    }
}