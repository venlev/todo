import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  
  createForm = new FormGroup({
    title: new FormControl('')
  });

  allEntries;

  constructor(private CRUD: CRUDService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    //this.allEntries = this.mockobject;
    this.allEntries = this.CRUD.read() !== 'empty' ? this.CRUD.read() : {}

  }

  onSubmit(): void {
    //this.createForm.reset();
  }

  submit(data){
    console.log(data.title);
    this.CRUD.create(data.title);
  }
}

