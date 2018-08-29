class PensionShedule{
    polyer : number;
	month : number;
	contribution  :number;
	commision : number;
	expenses : number;
	profit : number;
	amtcrtfnd : number;
	fndBeforeInt : number;
	intRat1 : number;
    clsFnd1 : number;
    intRat2 : number;
    clsFnd2 : number;
    intRat3 : number;
    clsFnd3 : number;
    
    constructor(polyer : number,
        month : number,
        contribution  :number,
        commision : number,
        expenses : number,
        profit : number,
        amtcrtfnd : number,
        fndBeforeInt : number,
        intRat1 : number,
        clsFnd1 : number,
        intRat2 : number,
        clsFnd2 : number,
        intRat3 : number,
        clsFnd3 : number){

            this.polyer=polyer;
            this.month=month;
            this.contribution=contribution;
            this.commision=commision;
            this.expenses=expenses;
            this.profit=profit;
            this.amtcrtfnd=amtcrtfnd;
            this.fndBeforeInt=fndBeforeInt;
            this.intRat1=intRat1;
            this.clsFnd1=clsFnd1;
            this.intRat2=intRat2;
            this.clsFnd2=clsFnd2;
            this.intRat3=intRat3;
            this.clsFnd3=clsFnd3;

    }
}