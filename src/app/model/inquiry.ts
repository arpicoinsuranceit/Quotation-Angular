
export class Inquiry {

    generalData: GeneralData;
    mainlifeInquiry: MainlifeInquiry;
    spouseInquiry: SpouseInquiry;
    childInquirys: ChildInquiry[];
    nomineeInquires: NomineeInquiry[];

    benefictMainlife: BenefictInquiry[];
    benefictSpouse: BenefictInquiry[];
    benefictChildren: BenefictInquiry[];

    medicalReqMainlife : MedicalReq [];
    medicalReqSpouse : MedicalReq [];
    medicalReqChildren : MedicalReq [];

    transferHistory :TransferHistory[];

    settlement : Settlement[];

    paymentHistory : PaymentHistory[];

    policyDispatchAcknow : PolicyDispatchAcknow;

    constructor(generalData: GeneralData, mainlifeInquiry: MainlifeInquiry, spouseInquiry: SpouseInquiry,
        childInquiry: ChildInquiry[], nomineeInquires: NomineeInquiry[], benefictMainlife: BenefictInquiry[],
        benefictSpouse: BenefictInquiry[],  benefictChildren: BenefictInquiry[], medicalReqMainlife : MedicalReq [],
        medicalReqSpouse : MedicalReq [],  medicalReqChildren : MedicalReq [], transferHistory :TransferHistory[],
        settlement : Settlement[],paymentHistory : PaymentHistory[], policyDispatchAcknow : PolicyDispatchAcknow) {

        this.generalData = generalData;
        this.mainlifeInquiry = mainlifeInquiry;
        this.spouseInquiry = spouseInquiry;
        this.childInquirys = childInquiry;
        this.nomineeInquires = nomineeInquires;
        this.benefictMainlife = benefictMainlife;
        this.benefictSpouse = benefictSpouse;
        this.benefictChildren = benefictChildren;

        this.medicalReqMainlife = medicalReqMainlife;
        this.medicalReqSpouse = medicalReqSpouse;
        this.medicalReqChildren = medicalReqChildren;

        this.transferHistory = transferHistory;
        this.settlement = settlement;
        this.paymentHistory = paymentHistory;
        this.policyDispatchAcknow = policyDispatchAcknow;
    }

}

export class GeneralData {
    proposanNo: string;
    policyNo: string;
    commeencementDate: string;
    branchCode: string;
    productName: string;
    expDate: string;
    seqNo: string;

    payTerm: string;
    targetPremium: number;
    relTerm: number;
    topTerm: number;
    basicSum: number;
    premiumForBasicSum: number;
    totalPremiun: number;
    quotationNum: string;
    proposalStatus : string;
	proposalDescription : string;
}

export class MainlifeInquiry {
    fName: string = "";
    iniName: string = "";
    address: string = "";
    nic: string = "";
    dob: string = "";
    mobile: string = "";
    tele: string = "";
    bankCode: string = "";
    bankAcc: string = "";
    previlageCard: string = "";
    email: string = "";
    ageNext: string = "";
    sex: string = "";
    status: string = "";
    occupation: string = "";

}

export class SpouseInquiry {
    fName: string = "";
    iniName: string = "";
    nic: string = "";
    dob: string = "";
    sex: string = "";
    occupation: string = "";

}

export class ChildInquiry {
    name: string = "";
    relation: string = "";
    dob: string = "";
    age: string = "";
    sex: string = "";
    cibc: string = "";
    hbc: string = "";
    hrbc: string = "";
    suhrbc: string = "";

}

export class NomineeInquiry {
    name: string = "";
    relation: string = "";
    nic: string = "";
    dob: string = "";
    shared: string = "";
    gName: string = "";
    gDob: string = "";
    gNic: string = "";
    gRelation: string = "";
}

export class BenefictInquiry {
    code: string = "";
    name: string = "";
    term: string = "";
    sumAssured: string = "";
    premium: string = "";
}

export class MedicalReq {
    testCode: string = "";
    testName: string = "";
    origin: string = "";
    recived: string = "";
    hospital: string = "";
    testDate: string = "";
    payAmount: string = "";
    payStatus: string = "";
    additionalNotes: string = "";
}

export class TransferHistory {
    agentCode: string = "";
    name: string = "";
    agentClass: string = "";
    fromDate: string = "";
    toDate: string = "";
}

export class Settlement {
    number: string = "";
    Code: string = "";
    Name: string = "";
    totPremium: number = -1;
    branch: string = "";
    status: string = "";
    mode: string = "";
}


export class PaymentHistory {
    year : number = 0;
    month : number = 0;
    date : string = "";
    settledAmt : number = 0;
    dueAmt : number = 0;
    dueDate : string = "";
    outstanding : number = 0;
    remark : string = "";
}

export class PolicyDispatchAcknow {
    dispatch = {
        dspdat : "",
        agncod : "",
        agnnam : "",
        ackdat : "",
        cusdat : "" 
    };

    care = {
        cadsdt : "",
        remark : ""
    }
}