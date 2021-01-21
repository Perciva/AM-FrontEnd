import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ReportSummaryServiceService {

  constructor(private apollo: Apollo) { }

  GetAttendanceSummary(
    assistant_id: number,
    start_date: string,
    end_date: string,
    period_id : number){
    return this.apollo
    .query<any>({
      query: gql`
      query getAttendanceSummary(
        $assistant_id: Int!
        $end_date: String!
        $start_date: String!
        $period_id:Int!
       ) {
        GetAttendanceSummary(
         assistant_id: $assistant_id
         start_date: $start_date
         end_date: $end_date
         period_id : $period_id
        ){
         leader
         assistant
         in{
          IT
          LM
          TM
         }
         out{
          LP
          TL
          IP
         }
         special{
          CT
          SK
         }
         unverified
        }
       }
           
      `,
      variables: {
        "assistant_id": assistant_id,
        "start_date": start_date,
        "end_date": end_date,
        "period_id": period_id
      }
    });
  }
}
