import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { UserPost } from './model/User';

@Injectable()
export class authentication
{
    constructor(private httpclient: HttpClient){}

    getUser(_data: UserPost): Observable<any>{
        return this.httpclient.post('https://laboratory.binus.ac.id/lapi/api/Account/LogOnQualification', _data);
    }

}