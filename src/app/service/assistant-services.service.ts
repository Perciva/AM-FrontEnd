import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private apollo: Apollo) { }

  GetAllAssistant(period_id: number){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id:Int!) {
        GetAssistantByPeriodId(period_id:$period_id) {
          id
          period{
            id
            description
            start
            end
          }
          leader{
            id
            initial
            name
          }
          initial
          name
        }
      }
      `,
      variables:{
        "period_id": period_id,
      }
    })
  }

  GetAssistantById(id: number){
    return this.apollo
    .query<any>({
      query: gql`
      query($id:Int!) {
        GetAssistantById(id:$id) {
          id
          period{
            id
            description
            start
            end
          }
          leader{
            id
            initial
            name
          }
          initial
          name
          shift {
            id
            day
            _in
            _out
          }
        }
      }
      `,
      variables:{
        "id": id,
      }
    })
  }

  GetAssistantByLeaderId(leader_id: number, period_id: number){
    return this.apollo
    .query<any>({
      query: gql`
      query($leader_id: Int!, $period_id: Int!) {
        GetAssistantByLeaderId(leader_id: $leader_id, period_id: $period_id) {
          id
          initial
          name
        }
      }
      `,
      variables:{
        "leader_id": leader_id,
        "period_id": period_id
      }
    })
  }
  
  InsertAssistant(period_id: number, leader_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $leader_id: Int!, $initial: String!, $name: String!) {
          InsertAssistant(period_id: $period_id, leader_id: $leader_id, initial: $initial, name: $name)
        }      
      `,
      variables: {
        "period_id": period_id,
        "leader_id": leader_id,
        "initial": initial,
        "name": name,
      }
    });
  }
  
  InsertAssistantByLeaderInitial(period_id: number, leader_initial: string, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $leader_initial: String!, $initial: String!, $name: String!) {
          InsertAssistantByLeaderInitial(period_id: $period_id, leader_initial: $leader_initial, initial: $initial, name: $name)
        }
         
      `,
      variables: {
        "period_id": period_id,
        "leader_initial": leader_initial,
        "initial": initial,
        "name": name,
      }
    });
  }
  
  UpdateAssistant(id: number, period_id: number, leader_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!, $period_id: Int!, $leader_id: Int!, $initial: String!, $name: String!) {
          UpdateAssistant(id:$id, period_id: $period_id leader_id: $leader_id, initial: $initial, name: $name)
        }
      `,
      variables: {
        "id": id,
        "period_id": period_id,
        "leader_id": leader_id,
        "initial": initial,
        "name": name,
      }
    });
  }
  
  DeleteAssistant(id: number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeleteAssistant(id:$id)
        }
      `,
      variables: {
        "id": id
      }
    });
  }
}
