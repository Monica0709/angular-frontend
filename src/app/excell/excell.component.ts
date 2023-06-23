import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excell',
  templateUrl: './excell.component.html',
  styleUrls: ['./excell.component.css']
})
export class ExcellComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor( private router: Router){}
  downloadSampleExcel(): void {
    const data: Array<any> = [
      ['Name', 'Age', 'City'],
      ['John Doe', 30, 'New York'],
      ['Jane Smith', 25, 'London'],
      ['Bob Johnson', 40, 'Paris']
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    XLSX.writeFile(workbook, 'sample.xlsx');
  }
}
