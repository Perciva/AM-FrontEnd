import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  constructor( private apollo: Apollo) { }

  GetAssistantShifts(assistant_id){
    return this.apollo
    .query<any>({
      query: gql`
      query($assistant_id:Int!){
        GetAssistantShifts(assistant_id:$assistant_id){
          id
          assistant{
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
          day
          _in
          _out
        }
      }
           
      `,
      variables: {
        "assistant_id": assistant_id,
      }
    });
  }
  
  InsertShift(assistant_id: number, day: number, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($assistant_id: Int!,$day:Int! $_in: String!, $_out: String!) {
          InsertShift(assistant_id: $assistant_id, day: $day, _in: $_in, _out: $_out)
        }
         
      `,
      variables: {
        "assistant_id": assistant_id,
        "day": day,
        "_in": _in,
        "_out": _out,
      }
    });
  }
  
  InsertShiftByAssistantInitial(period_id: number, assistant_initial: string, day: number, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($period_id: Int!, $assistant_initial: String!,$day:Int! $_in: String!, $_out: String!) {
          InsertShiftByAssistantInitial(period_id: $period_id, assistant_initial: $assistant_initial, day: $day, _in: $_in, _out: $_out)
        }
         
      `,
      variables: {
        "period_id": period_id,
        "assistant_initial": assistant_initial,
        "day": day,
        "_in": _in,
        "_out": _out,
      }
    });
  }

  
  UpdateShift(id: number, assistant_id: number, day: number, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation($id: Int!, $assistant_id: Int! $day: Int!, $_in: String!, $_out: String!) {
        UpdateShift(id:$id, assistant_id: $assistant_id, day: $day, _in: $_in, _out: $_out)
      }
      
      `,
      variables: {
        "id": id,
        "assistant_id": assistant_id,
        "day": day,
        "_in": _in,
        "_out": _out,
      }
    });
  }
  
  DeleteShift(id:number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeleteShift(id: $id)
        }      
      `,
      variables: {
        "id": id,
      }
    });
  }
  
  DeleteAllAssistantShifts(assistant_id:number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($assistant_id: Int!) {
          DeleteAllAssistantShifts(assistant_id: $assistant_id)
        }      
      `,
      variables: {
        "assistant_id": assistant_id,
      }
    });
  }
}
