import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class InsertAttendanceServiceService {

  constructor(private apollo: Apollo) { }

  InsertAttendance(assistant_initial: string, period_id:number, date: string, _in: string, _out: string){
    return this.apollo
    .mutate<any>({
      mutation: gql`
      mutation(
        $assistant_initial: String!
  			$period_id: Int!
        $date: String!
        $_in: String!
        $_out: String!
      ) {
        InsertAttendance(
          assistant_initial: $assistant_initial
          period_id:$period_id
          date: $date
          _in: $_in
          _out: $_out
        )
      }           
      `,
      variables: {
        "assistant_initial": assistant_initial,
        "period_id": period_id,
        "date": date,
        "_in": _in,
        "_out": _out
      }
    });
  }
}
