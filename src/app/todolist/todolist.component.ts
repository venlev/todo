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
    this.ngOnInit();
  }

  checkboxStatusChange(card:object){
    const entryToUpdate = {
      "title": card["title"],
      "isDone": !card["isDone"]
    }
    console.log(`sending old ${JSON.stringify(card)} and new ${JSON.stringify(entryToUpdate)}`)
    this.CRUD.update(card, entryToUpdate);

  }

  deleteEntry(card: object){
    this.CRUD.delete(card);
  }
}

