import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PeriodServicesService {

  constructor( private apollo: Apollo) { }

  GetAllPeriods(){

    return this.apollo
    .query<any>({
      query: gql`
        query {
          GetAllPeriods {
            description
            start
            end
          }
        }
      `,
    });
  }
  
  InsertPeriods(){

    return this.apollo
    .query<any>({
      query: gql`
        query {
          GetAllPeriods {
            description
            start
            end
          }
        }
      `,
    });
  }
}