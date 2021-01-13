import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-variable';
import { AssistantService } from 'src/app/service/assistant-services.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-assistant-page',
  templateUrl: './assistant-page.component.html',
  styleUrls: ['./assistant-page.component.scss']
})
export class AssistantPageComponent implements OnInit {
  title= 'XlsRead';
  file:File;
  arrayBuffer:any;
  fileList:any;

  constructor(private assistantService: AssistantService) { }

  ngOnInit(): void {
  }

  addfile(event) {
    this.file= event.target.files[0]; 
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file); 
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var period_id = GlobalConstants.CURR_PERIOD.id;
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = "Anak Bina";
      var worksheet = workbook.Sheets[first_sheet_name];
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true}); 
      arraylist.forEach(element => {
        var initial = element["Full Initial"];
        var leader = element["Leader Initial"];
        var name = element["Nama"];
        console.log(element["AM_Format"])
        this.assistantService.InsertAssistant(period_id, 1, initial, name).subscribe(
          async data => {
          }
        )
      });

    }
  }
}
