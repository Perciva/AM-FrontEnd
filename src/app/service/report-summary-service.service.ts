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
          TL
         }
         out{
          IP
          LP
          TL
         }
         special{
          CT
          SK
          TL
          AP
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

  GetAllAttendanceSummaryByLeader(
    period_id : number,
    leader_id: number,
    start_date: string,
    end_date: string){
    return this.apollo
    .query<any>({
      query: gql`
      query getAllAttendanceSummaryByLeader(
        $period_id: Int!
        $leader_id: Int!
        $end_date: String!
        $start_date: String!
      ) {
        GetAllAssistantAttendanceSummaryByLeader(
          period_id: $period_id
          leader_id: $leader_id
          start_date: $start_date
          end_date: $end_date
        ) {
          leader
          assistant
          in {
            IT
            LM
            TM
            TL
          }
          out {
            IP
            LP
            TL
          }
          special {
            CT
            SK
            TL
            AP
          }
          unverified
        }
      }
      
           
      `,
      variables: {
        "period_id": period_id,
        "leader_id": leader_id,
        "start_date": start_date,
        "end_date": end_date,
      }
    });
  }

  GetAllAttendanceSummary(
    period_id : number,
    start_date: string,
    end_date: string){
    return this.apollo
    .query<any>({
      query: gql`
      query getAllAttendanceSummary(
        $period_id: Int!
        $end_date: String!
        $start_date: String!
      ) {
        GetAllAssistantAttendanceSummary(
          period_id: $period_id
          start_date: $start_date
          end_date: $end_date
        ) {
          leader
          assistant
          in {
            IT
            LM
            TM
            TL
          }
          out {
            IP
            LP
            TL
          }
          special {
            CT
            SK
            TL
            AP
          }
          unverified
        }
      }
      
      
           
      `,
      variables: {
        "period_id": period_id,
        "start_date": start_date,
        "end_date": end_date,
      }
    });
  }

  
}
