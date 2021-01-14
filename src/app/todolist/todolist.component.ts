import { Component, OnInit } from '@angular/core';
import { CRUDService } from '../services/crud.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  
  createForm = new FormGroup({
    title: new FormControl('')
  });

  allEntry;
  allEntries: Object[] = []; 

  constructor(private CRUD: CRUDService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    //this.allEntries = this.mockobject;
    this.allEntry = this.CRUD.read();
    if(this.allEntry){
      this.allEntry.forEach(element => {
        this.allEntries.push(JSON.parse(element));
      });
    }
    
  }

  onSubmit(): void {
    //this.createForm.reset();
  }

  submit(data){
    console.log(data.title);
    this.CRUD.create(data.title);
  }

  testThing = this.CRUD.todos.subscribe({
    next(data) { 
      if(data && data.length > 0){
        console.log('new data incoming: ', data)
        this.allEntries = data;
      }
     }
  })


}

