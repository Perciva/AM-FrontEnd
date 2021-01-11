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
  
  InsertLeader(period_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $initial: String!, $name: String!) {
          InsertLeader(period_id: $period_id, initial: $initial, name: $name)
        }      
      `,
      variables: {
        "period_id": period_id,
        "initial": initial,
        "name": name,
      }
    });
  }

  
  UpdateLeader(id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!, $initial: String!, $name: String!) {
          UpdateLeader(id: $id, initial: $initial, name: $name)
        }  
      `,
      variables: {
        "id": id,
        "initial": initial,
        "name": name,
      }
    });
  }
  
  DeleteLeader(id:number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeleteLeader(id: $id)
        }      
      `,
      variables: {
        "id": id,
      }
    });
  }
}
