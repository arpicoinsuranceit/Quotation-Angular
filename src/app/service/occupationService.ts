import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Occupation } from '../model/occupation';

@Injectable()
export class OccupationService {
    constructor(private http: Http){}

    
    
    loadOccupation(){
        return this.http.get('http://10.10.10.120:8084/Quotation/occupation');
        
    }

    
    
}