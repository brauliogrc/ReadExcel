import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as XLSX from "xlsx";

type AOA = any[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  constructor(private _http: HttpClient){}

  onFileSelected(event) {
    const target : DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('No se pueden seleccionar multiples archivos');
    const reader: FileReader = new FileReader();
    reader.onload = (e) => {
      // Lectura del libro
      const bstr: string | ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];


      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data);
      
    };
    reader.readAsBinaryString(target.files[0]);
    // console.log(this.data);
  }
}
