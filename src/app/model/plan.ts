export class Plan {
    _term: number;
    _frequance: string;
    _bsa : number;
    _payingterm : string;
    _msfb: number;
    _interestRate : string;
    _bsaTotal : number
    contribution : number;
    _hidbsa : number;
    _nomineeName : string;
    _nomineedob : string;
    _nomineeAge : number;
    _nomoneeRelation : string;
    age  : number;
    pensionPaingTerm : number;
    retAge : number;
}

export class PlanAip {
    _term: number;
    _frequance: string;
    _contribution : number;
}

export class PlanArp {
    _payingterm: string;
    _term: number;
    _frequance: string;
    _bsa : number;
}

export class PlanDta {
    _term: number;
    _frequance: string;
    _loanamount : number;
    _intrate : number;
}

export class PlanArtm {
    _term: number;
    _frequance: string;
    _contribution : number;
    payingTerm : string;
    pensionPaingTerm : number;
    retAge : number;
}