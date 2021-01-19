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

  createTask = new FormGroup({
    taskName: new FormControl('')
  });

  allEntries: Object[] = [];

  constructor(private CRUD: CRUDService) {
    this.CRUD.todos.subscribe(data => {
      this.allEntries = data;
    })
  }

  ngOnInit(): void {
    this.CRUD.init();
  }

  submit(data) {
    this.CRUD.create(data.title);
    this.createForm.reset()
    //this.ngOnInit();
  }
  
  submitTask(taskName, parentID){
    if(taskName && parentID){
      const name = taskName.taskName;
      this.CRUD.addTask(taskName, parentID);
    }
  }

  checkboxStatusChange(card: object){
    this.CRUD.update(card);

  }

  deleteEntry(card: {"id": number}){
    const id = card["id"]; 
    this.CRUD.delete(id);
  }
}

