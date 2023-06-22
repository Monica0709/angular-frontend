import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-excell',
  templateUrl: './excell.component.html',
  styleUrls: ['./excell.component.css']
})
export class ExcellComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor( private router: Router){}

}
