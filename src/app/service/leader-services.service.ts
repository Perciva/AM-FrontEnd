import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor( private apollo: Apollo) { }

  GetAllLeader(period_id){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id:Int!){
        GetLeaderByPeriodId(period_id:$period_id){
          id
          period{
            id
            description
            start
            end
          }
          initial
          name
        }
      }
           
      `,
      variables: {
        "period_id": period_id,
      }
    });
  }

  GetLeaderByInitialAndPeriod(period_id, initial){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id:Int!, $initial:String!) {
        GetLeaderByInitialAndPeriod(period_id:$period_id, initial:$initial) {
          id
          period{
            id
            description
            start
            end
          }
          initial
          name
        }
      }
           
      `,
      variables: {
        "period_id": period_id,
        "initial": initial,
      }
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

  
  UpdateLeader(id: number, period_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!, $period_id: Int!, $initial: String!, $name: String!) {
          UpdateLeader(id: $id, period_id: $period_id, initial: $initial, name: $name)
        }  
      `,
      variables: {
        "id": id,
        "period_id": period_id,
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
