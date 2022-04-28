import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent implements OnInit {

  constructor( private router :Router ) { }

  doSearch(value : string) {
        this.router.navigateByUrl(`/search/${value}`);
  }

  ngOnInit(): void {
  }

}
