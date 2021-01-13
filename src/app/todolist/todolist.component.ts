import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  
  createForm = this.formBuilder.group({
    title: ''
  });

  allEntries;

  constructor(private CRUD: CRUDService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    //this.allEntries = this.mockobject;
    this.allEntries = this.CRUD.read() !== 'empty' ? this.CRUD.read() : {}

  }

  onSubmit(): void {
    this.createForm.reset();
  }

}

