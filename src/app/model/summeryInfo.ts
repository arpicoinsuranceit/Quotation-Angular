
export class Summery {
    _payType = 'Monthly';
    _term = 10;
    sumAssured = 0.00;
    oc = 0.00;
    premiumAdd = 0.00;
    totPremium = 0.00;
    at6 = 0.00;
    at8 = 0.00;
    at10 = 0.00;
    l2 = 0.0;
    occuLodingTot = 0.0;
    withoutLoadingTot = 0.0;
    dtaShedules : DTAShedule[];
    pensionShedule : PensionShedule[];
    healthBenMain : any;
    healthBenSpouse : any;
    surrenderValHelpers : SurrenderValHelper[];
    pensionPremium1 =0.00;
    pensionPremium2 =0.00;
    pensionPremium3 =0.00;
}
export class Health {
    CIB = 0;
    CIBTerm = 0;
    SCIB = 0;
    SCIBTerm = 0;
    CIBC = 0;
    CIBCTerm = 0;

    HB = 0;
    HBTerm = 0;
    HBS = 0;
    HBSTerm = 0;
    HBC = 0;
    HBCTerm = 0;

    HRB = 0;
    HRBTerm = 0;
    HRBC = 0;
    HRBCTerm = 0;
    HRBS = 0;
    HRBSTerm = 0;

    HRBI = 0;
    HRBITerm = 0;
    HRBIC = 0;
    HRBICTerm = 0;
    HRBIS = 0;
    HRBISTerm = 0;

    HRBF = 0;
    HRBFTerm = 0;
    HRBFC = 0;
    HRBFCTerm = 0;
    HRBFS = 0;
    HRBFSTerm = 0;

    SUHRB = 0;
    SUHRBTerm = 0;
    SUHRBS = 0;
    SUHRBSTerm = 0;
    SUHRBC = 0;
    SUHRBCTerm = 0;

    SHCBF = 0;
    SHCBFTerm = 0;
    SHCBFS = 0;
    SHCBFSTerm = 0;
    SHCBFC = 0;
    SHCBFCTerm = 0;
}
export class Protection {
    SFPO = 0;
    SFPOTerm = 0;
    ADB = 0;
    ADBTerm = 0;
    ADBS = 0;
    ADBSTerm = 0;
    ATPB = 0;
    ATPBTerm = 0;
    FEB = 0;
    FEBTerm = 0;
    FEBS = 0;
    FEBSTerm = 0;
    MFIBD = 0;
    MFIBDTerm = 0;
    MFIBDT = 0;
    MFIBDTTerm = 0;
    MFIBT = 0; 
    MFIBTTerm = 0;
    WPB = 0;
    WPBTerm = 0;
    WPBS = 0;
    WPBSTerm = 0;

    BSAS = 0;
    BSASTerm = 0;

    JLB = 0;
    JLBTerm = 0;

    JLBPL = 0;
    JLBPLTerm = 0;

    L2 = 0;
    L2Term = 0;
}
export class Disabalities {
    PPDBS = 0;
    PPDBSTerm = 0;
    TPDASBS = 0;
    TPDASBSTerm = 0;
    TPDBS = 0;
    TPDBSTerm = 0;
    PPDB = 0;
    PPDBTerm = 0;
    TPDASB = 0;
    TPDASBTerm = 0;
    TPDB = 0;
    TPDBTerm = 0;
    TPDDTA = 0;
    TPDDTATerm = 0;
    TPDDTAS = 0;
    TPDDTASTerm = 0;
    TPDDTAPL = 0;
    TPDDTAPLTerm = 0;
    TPDDTASPL = 0;
    TPDDTASPLTerm = 0;
}
export class SummeryInfo {
    _summery=new Summery;
    _health=new Health;
    _disablities=new Disabalities;
    _protection=new Protection;
    
}

export class DTAShedule{
    polYear : number;
	outyer: number;
	outsum: number;
	lonred: number;
	prmrat: number;
	premum: number;
}

export class Shedule{
    policyYear : number;
	outYear: number;
	outSum: number;
	lorned: number;
	premiumRate: number;
	premium: number;
}