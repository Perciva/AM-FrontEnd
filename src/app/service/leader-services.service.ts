import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor( private apollo: Apollo) { }

  GetAllLeader(){
    return this.apollo
    .query<any>({
      query: gql`
        query {
          GetAllLeader {
            id
            period_id
            initial
            name
          }
        }
      
      `,
    });
  }
}
