import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private apollo: Apollo) { }
  
  InsertAssistant(perios_id: number, leader_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $leader_id: Int!, $initial: String!, $name: String!) {
          InsertAssistant(period_id: $period_id, leader_id: $leader_id, initial: $initial, name: $name)
        }      
      `,
      variables: {
        "period_id": perios_id,
        "leader_id": leader_id,
        "initial": initial,
        "name": name,
      }
    });
  }
  
  UpdateAssistant(id: number, leader_id: number, initial: string, name: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!, $leader_id: Int!, $initial: String!, $name: String!) {
          UpdateAssistant(id:$id, leader_id: $leader_id, initial: $initial, name: $name)
        }
      `,
      variables: {
        "id": id,
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
