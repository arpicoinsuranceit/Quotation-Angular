import { BranchTargetSummary } from './../../view/commitment/commitment.component';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommitmentService {

  
  constructor(private http:Http) { }

  getBranchTargetCommitmentSummaryZonalM(year:string,zoneCode:string){
    return this.http.get('http://localhost:8085/targetsummaryz/'+year+"/"+zoneCode);
  }

  getBranchTargetCommitmentSummaryBranchM(year: string, brnCode: string){
    return this.http.get('http://localhost:8085/targetsummaryb/'+year+"/"+brnCode);
  }

  getZoneCode(agnCode:string){
    return this.http.get('http://localhost:8085/zonecode/'+agnCode);
  }

  getAllZoneCode(){
    return this.http.get('http://localhost:8085/getAllZone');
  }

  editCommitment(commitmentSummary:BranchTargetSummary){
      console.log(commitmentSummary);
      return this.http.post('http://localhost:8085/updatecommitment',commitmentSummary);
  }

}
