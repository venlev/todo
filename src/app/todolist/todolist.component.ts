import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  constructor(private CRUD: CRUDService) { }

  ngOnInit(): void {
    
  }

}
