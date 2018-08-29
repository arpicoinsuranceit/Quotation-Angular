export class BenefitsValidations{
    validateadb(bsa, rbsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa >= bsa && rbsa <= bsa * 6 && rbsa % 25000 == 0 && rbsa <= 25000000)
					|| (bsa >= 25000000 && rbsa <= 25000000)) {
			return 1;
		}else{
            return 0; 
        }
    }

    validateL2(rbsa){
        rbsa=parseFloat(rbsa);

        if ((rbsa <= 1000000) && (rbsa >= 100000) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateadbAsfp(bsa, rbsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa <= 500000 * 6 && rbsa % 25000 == 0 && rbsa >= 500000)) {
			return 1;
		}else{
            return 0; 
        }
    }

    validatesfpo(bsa,rbsa) {
        bsa=parseFloat(bsa);
        rbsa=parseFloat(rbsa);

        if (rbsa >= 250000 && (rbsa%25000==0)) {
            return 1;
        } else {
            return 0;
        }
    }

    validatteAtpb(bsa, rbsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if (rbsa >= bsa && rbsa <= bsa * 10 && rbsa % 25000 == 0){
            return 1;
        }else{
            return 0;
        }
    }

    validatteAtpbASFP(bsa, rbsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if (rbsa >= 500000 && rbsa <= 500000 * 10 && rbsa % 25000 == 0){
            return 1;
        }else{
            return 0;
        }
    }

    validateTPDASB(rbsa, adb) {
        rbsa=parseFloat(rbsa);
        adb=parseFloat(adb);

        if (adb == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validateTPDB(rbsa, adb) {
        rbsa=parseFloat(rbsa);
        adb=parseFloat(adb);

        if (adb == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validatePPDB(rbsa, adb) {
        rbsa=parseFloat(rbsa);
        adb=parseFloat(adb);

        if (adb == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validateCIB(rbsa, bsa, atpb) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);
        atpb=parseFloat(atpb);

        if ((rbsa <= bsa + atpb) && (rbsa <= 6000000) && (rbsa > 249999) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateCIBEND(rbsa, bsa, atpb) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);
        atpb=parseFloat(atpb);

        if ((rbsa <= bsa + atpb) && (rbsa <= 6000000) && (rbsa >= 100000) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateCIBARTM(rbsa,l2){
        rbsa=parseFloat(rbsa);
        l2=parseFloat(l2);

        if ((rbsa >= 100000) && (rbsa <= l2*10) && (rbsa <= 6000000) && (rbsa%100000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateFEB(rbsa, bsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa <= bsa*0.10) && (rbsa < 75001 ) && (rbsa > 24999)){
            return 1;
        }else{
            return 0;
        }
    }

    validateFEBEND(rbsa, bsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa <= bsa*0.10) && (rbsa < 75001 ) && (rbsa >= 10000)){
            return 1;
        }else{
            return 0;
        }
    }

    validateMFIBD(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa < 100001 ) && (rbsa > 9999) && (rbsa%1000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateMFIBT(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa < 100001 ) && (rbsa > 9999) && (rbsa%1000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateMFIBDT(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa < 100001 ) && (rbsa > 9999) && (rbsa%1000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRB(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa <= 500000 ) && (rbsa >= 100000) && (rbsa%100000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBI(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa <= 500000 ) && (rbsa >= 100000) && (rbsa%100000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBF(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa <= 500000 ) && (rbsa >= 100000) && (rbsa%100000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateSUHRB(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa == 600000 ) || (rbsa == 800000) || (rbsa == 1000000)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHB(rbsa) {
        rbsa=parseFloat(rbsa);

        if ((rbsa >= 500 ) && (rbsa <= 15000) && (rbsa%100 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateSCB(rbsa, bsa, atpb) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if(atpb == null || atpb == undefined){
            atpb=0.0;
        }

        atpb=parseFloat(atpb);

        if ((rbsa > 249999) && (rbsa <= bsa + atpb)){
            return 1;
        }else{
            return 0;
        }
    }

    validateADBSNew(rbsa, scb, adb) {
        rbsa=parseFloat(rbsa);
        scb=parseFloat(scb);
        adb=parseFloat(adb);

        if (((rbsa >= scb) && (rbsa <= adb) && (rbsa <= (scb*6)) && (rbsa%25000 == 0) && (rbsa <= 25000000)) || (scb >= 25000000 && rbsa<=25000000)){
            return 1;
        }else{
            return 0;
        }
    }

    validateADBS(rbsa, scb) {
        rbsa=parseFloat(rbsa);
        scb=parseFloat(scb);

        if (((rbsa >= scb) && (rbsa <= (scb*6)) && (rbsa%25000 == 0) && (rbsa <= 25000000)) || (scb >= 25000000 && rbsa<=25000000)){
            return 1;
        }else{
            return 0;
        }
    }

    validateTPDASBS(rbsa, adbs) {
        rbsa=parseFloat(rbsa);
        adbs=parseFloat(adbs);

        if (adbs == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validateTPDBS(rbsa, adbs) {
        rbsa=parseFloat(rbsa);
        adbs=parseFloat(adbs);

        if (adbs == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validatePPDBS(rbsa, adbs) {
        rbsa=parseFloat(rbsa);
        adbs=parseFloat(adbs);

        if (adbs == rbsa){
            return 1;
        }else{
            return 0;
        }
    }

    validateSCIB(rbsa, scb) {
        rbsa=parseFloat(rbsa);
        scb=parseFloat(scb);

        if ((rbsa <= scb) && (rbsa <= 6000000) && (rbsa > 249999) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateSCIBEND(rbsa, scb) {
        rbsa=parseFloat(rbsa);
        scb=parseFloat(scb);

        if ((rbsa <= scb) && (rbsa <= 6000000) && (rbsa >= 100000) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateFEBS(rbsa, bsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa <= bsa*0.10) && (rbsa < 75001 ) && (rbsa > 24999)){
            return 1;
        }else{
            return 0;
        }
    }

    validateFEBSEND(rbsa, bsa) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);

        if ((rbsa <= bsa*0.10) && (rbsa < 75001 ) && (rbsa > 10000)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBS(rbsa,hrb) {
        rbsa=parseFloat(rbsa);
        hrb=parseFloat(hrb);

        if (rbsa == hrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBIS(rbsa,hrb) {
        rbsa=parseFloat(rbsa);
        hrb=parseFloat(hrb);

        if (rbsa == hrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateSUHRBS(rbsa,suhrb) {
        rbsa=parseFloat(rbsa);
        suhrb=parseFloat(suhrb);

        if (rbsa == suhrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateHBS(rbsa,hb) {
        rbsa=parseFloat(rbsa);
        hb=parseFloat(hb);

        if ((rbsa >= 500 ) && (rbsa <= 15000) && (rbsa == hb) && (rbsa%100 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateCIBC(rbsa, bsa, atpb) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);
        atpb=parseFloat(atpb);

        if ((rbsa > 249999) && (rbsa < 1000001) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateCIBCEND(rbsa, bsa, atpb) {
        rbsa=parseFloat(rbsa);
        bsa=parseFloat(bsa);
        atpb=parseFloat(atpb);

        if ((rbsa >= 100000) && (rbsa < 1000001) && (rbsa%25000 == 0)){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBC(rbsa,hrb) {
        rbsa=parseFloat(rbsa);
        hrb=parseFloat(hrb);

        if (rbsa == hrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateHRBIC(rbsa,hrb) {
        rbsa=parseFloat(rbsa);
        hrb=parseFloat(hrb);

        if (rbsa == hrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateSUHRBC(rbsa,suhrb) {
        rbsa=parseFloat(rbsa);
        suhrb=parseFloat(suhrb);

        if (rbsa == suhrb){
            return 1;
        }else{
            return 0;
        }
    }

    validateHBC(rbsa,hb) {
        rbsa=parseFloat(rbsa);
        hb=parseFloat(hb);

        if ((rbsa >= 500 ) && (rbsa <= 15000) && (rbsa == hb) && (rbsa%100 == 0)){
            return 1;
        }else{
            return 0;
        }
    }
}