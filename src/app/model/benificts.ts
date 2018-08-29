
export class Benif {
    active: string;
    sumAssured: number;
    premium: number;
}

export class ADB { benif: Benif; }
export class ATPB { benif: Benif; }
export class CIB { benif: Benif; }
export class FEB { benif: Benif; }
export class HB { benif: Benif; }
export class HRB { benif: Benif; }
export class MFIBD { benif: Benif; }
export class MFIBDT { benif: Benif; }
export class MFIBT { benif: Benif; }
export class PPDB { benif: Benif; }
export class SUHRB { benif: Benif; }
export class TPDASB { benif: Benif; }
export class TPDB { benif: Benif; }
export class WPB { benif: Benif; }

export class MainLifeBenificts{
    adb : ADB;
    atpb : ATPB;
    cib : CIB;
    feb : FEB;
    hb : HB;
    hrb : HRB;
    mfibd : MFIBD;
    mfibdt : MFIBDT;
    mfibt : MFIBT;
    ppdb : PPDB;
    suhrb : SUHRB;
    tpdasb : TPDASB;
    tpdb : TPDB;
    wpb : WPB;
}

export class BSAS { benif: Benif; }
export class ADBS { benif: Benif; }
export class CIBS { benif: Benif; }
export class FEBS { benif: Benif; }
export class HBS { benif: Benif; }
export class HRBS { benif: Benif; }
export class PPDBS { benif: Benif; }
export class SUHRBS { benif: Benif; }
export class TPDASBS { benif: Benif; }
export class TPDBS { benif: Benif; }
export class WPBS { benif: Benif; }

export class SpouseBenificts{
    bsas : BSAS;
    adbs : ADBS;
    cibs : CIBS;
    febs : FEBS;
    hbs : HBS;
    hrbs : HRBS;
    ppdbs : PPDBS;
    suhrbs : SUHRBS;
    tpdasbs : TPDASBS;
    tpdbs : TPDBS;
    wpbs : WPBS;
}

export class CIBC { benif: Benif; }
export class HBC { benif: Benif; }
export class HRBC { benif: Benif; }
export class SUHRBC { benif: Benif; }

export class ChildrenBenificts{
    cibc : CIBC;
    hbc : HBC;
    hrbc : HRBC;
    suhrbc : SUHRBC;
}

/*export class Benifict{
    mainlifeBenif = new MainLifeBenificts();
    spouseBenif : SpouseBenificts;
    childrenBenif : ChildrenBenificts;
}*/

export class Benifict{
    type: string;
    active: string;
    sumAssured: number;
    premium: number;
}