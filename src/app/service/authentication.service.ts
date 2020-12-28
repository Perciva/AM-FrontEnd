import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class authentication
{
    constructor(private httpclient: HttpClient){}

    getUser(): Observable<any>{
        return this.httpclient.get('https://laboratory.binus.ac.id/lapi/api/Account/LogOnQualification');
    }

}