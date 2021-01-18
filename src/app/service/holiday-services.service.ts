import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HolidayServicesService {

  constructor(private apollo: Apollo) { }

  GetAllHoliday(period_id){
    return this.apollo
    .query<any>({
      query: gql`
      query($period_id:Int!) {
        GetHolidayByPeriodId(period_id:$period_id) {
          id
    			description
          date
      }
    }
           
      `,
      variables: {
        "period_id": period_id,
      }
    });
  }


  
}
