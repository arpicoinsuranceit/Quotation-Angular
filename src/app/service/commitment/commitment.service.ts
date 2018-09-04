import { BranchTargetSummary } from './../../view/commitment/commitment.component';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommitmentService {

  
  constructor(private http:Http) { }

  getBranchTargetCommitmentSummaryZonalM(year:string,zoneCode:string){
    return this.http.get('http://10.10.10.120:8084/Infosys/targetsummaryz/'+year+"/"+zoneCode);
  }

  getBranchTargetCommitmentSummaryBranchM(year: string, brnCode: string){
    return this.http.get('http://10.10.10.120:8084/Infosys/targetsummaryb/'+year+"/"+brnCode);
  }

  getZoneCode(agnCode:string){
    return this.http.get('http://10.10.10.120:8084/Infosys/zonecode/'+agnCode);
  }

  getAllZoneCode(){
    return this.http.get('http://10.10.10.120:8084/Infosys/getAllZone');
  }

  editCommitment(commitmentSummary:BranchTargetSummary){
      console.log(commitmentSummary);
      return this.http.post('http://10.10.10.120:8084/Infosys/updatecommitment',commitmentSummary);
  }

}
