import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ReportAttendanceService {

  constructor( private apollo: Apollo) { }

  GetAllAttendanceByDate(start_date: string, end_date: string, assistant_id: number){
    return this.apollo
    .query<any>({
      query: gql`
      query GetAllAttendanceByDate(
        $start_date: String!
        $end_date: String!
        $assistant_id: Int!
      ) {
        GetAllAttendanceByDate(
          start_date: $start_date
          end_date: $end_date
          assistant_id: $assistant_id
        ) {
          attendance {
            id
            date
            _in
            _out
            in_permission
            out_permission
            special_permission
            in_permission_description
            out_permission_description
            special_permission_description
            assistant {
              initial
              shift {
                day
                _in
                _out
              }
              leader {
                initial
              }
              period {
                description
              }
            }
          }
          special_shift {
            _in
            _out
            date
            description
          }
        }
      }
      `,
      variables: {
        "start_date": start_date,
        "end_date": end_date,
        "assistant_id": assistant_id,
      }
    });
  }

  UpdateAttendance(
    id: number, 
    in_permission: string, 
    out_permission: string, 
    special_permission: string, 
    in_permission_description: string, 
    out_permission_description: string, 
    special_permission_description: string
    ){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation(
        $id: Int!
        $in_permission: String
        $out_permission: String
        $special_permission: String
        $in_permission_description: String
        $out_permission_description: String
        $special_permission_description: String
      ) {
        UpdateAttendance(
          id: $id
          in_permission: $in_permission
          out_permission: $out_permission
          special_permission: $special_permission
          in_permission_description: $in_permission_description
          out_permission_description: $out_permission_description
          special_permission_description: $special_permission_description
        )
      }
      
      `,
      variables: {
        "id": id,
        "in_permission": in_permission,
        "out_permission": out_permission,
        "special_permission": special_permission,
        "in_permission_description": in_permission_description,
        "out_permission_description": out_permission_description,
        "special_permission_description": special_permission_description
      }
    });
  }
}
