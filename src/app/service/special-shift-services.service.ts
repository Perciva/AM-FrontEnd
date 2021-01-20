import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class SpecialShiftService {

  constructor( private apollo: Apollo) { }

  GetSpecialShifts(period_id){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id: Int!) {
        GetSpecialShiftByPeriodId(period_id: $period_id) {
          id
          period {
            id
            description
            start
            end
          }
          description
          assistant_ids
          date
          _in
          _out
        }
      }
      `,
      variables: {
        "period_id": period_id,
      }
    });
  }
  
  InsertSpecialShift(period_id: number, description: string, assistant_ids: string, date:string, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation(
        $period_id: Int!
        $description: String!
        $assistant_ids: String!
        $date: String!
        $_in: String!
        $_out: String!
      ) {
        InsertSpecialShift(
          period_id: $period_id
          description: $description
          assistant_ids: $assistant_ids
          date: $date
          _in: $_in
          _out: $_out
        )
      }
      `,
      variables: {
        "period_id": period_id,
        "description": description,
        "assistant_ids": assistant_ids,
        "date": date,
        "_in": _in,
        "_out": _out,
      }
    });
  }

  UpdateSpecialShift(id:number, period_id: number, description: string, assistant_ids: string, date:string, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation(
        $id: Int!
        $period_id: Int!
        $description: String!
        $assistant_ids: String!
        $date: String!
        $_in: String!
        $_out: String!
      ) {
        UpdateSpecialShift(
          id: $id
          period_id: $period_id
          description: $description
          assistant_ids: $assistant_ids
          date: $date
          _in: $_in
          _out: $_out
        )
      }
      `,
      variables: {
        "id": id,
        "period_id": period_id,
        "description": description,
        "assistant_ids": assistant_ids,
        "date": date,
        "_in": _in,
        "_out": _out,
      }
    });
  }
  
  DeleteSpecialShift(id:number){
    return this.apollo
    .mutate<any>({
      mutation: gql`
        mutation($id: Int!) {
          DeleteSpecialShift(id: $id)
        }      
      `,
      variables: {
        "id": id,
      }
    });
  }
}
