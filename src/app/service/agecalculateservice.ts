import swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AgeCalculationService {
    constructor(private http: Http){}

    
    
    loadAge(dob){
        return this.http.post('http://10.10.10.120:8084/Quotation/ageCal', dob);
    }

    loadAgeNominee(dob){
        return this.http.post('http://10.10.10.120:8084/Quotation/ageCalNominee', dob);
    }

    loadAgeAndDOBFromNic(nic:string){

        if(!(nic.length==12) && !(nic.length==10) ){
            swal("Nic Invalid..","","error");
            return;
        }

        if(nic.length==10){
            var patt= new RegExp('^\\d{9}[v,V,x,X]{1}');
            if(patt.test(nic)){
                nic=nic.substring(0,nic.length-1);
            }else{
                swal("Nic Invalid..","","error");
                return;
            }
            
        }

        if(nic.length==12){
            var patt= new RegExp('^\\d{12}');
            if(patt.test(nic)){

            }else{
                swal("Nic Invalid..","","error");
                return;
            }
            
        }

        if(nic.length==12 || nic.length==9){
            return this.http.post('http://10.10.10.120:8084/Quotation/ageCalculate', nic);
        }
       
    }

    
    
}