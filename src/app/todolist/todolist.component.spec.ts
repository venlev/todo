import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CRUDService } from '../services/crud.service';
import { TodolistComponent } from './todolist.component';
import { Card } from '../models/card.model';
import { Task } from '../models/task.model';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodolistComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit creation of a card', () => {
    //GIVEN
    const service = TestBed.inject(CRUDService);
    const todo = new TodolistComponent(service);
    const expected = [
      new Card({
        id: 1,
        title: 'card',
        isDone: false,
        tasks: []
      }),
      new Card({
        id: 2,
        title: 'card2',
        isDone: false,
        tasks: []
      })
    ];

    //WHEN
    todo.submit({ title: 'card' });
    todo.submit({ title: 'card2' });

    //THEN
    const data = todo.allEntries;
    expect(data).toEqual(expected);
    window.localStorage.clear();
  });

  it('should submit creation of a task on a card', () => {

    //GIVEN
    const service = TestBed.inject(CRUDService);
    const todo = new TodolistComponent(service);
    const expected = [
      new Card({
        id: 1,
        title: 'card',
        isDone: false,
        tasks: [
          new Task({
            id: 1,
            name: 'task',
            isDone: false
          }),

          new Task({
            id: 2,
            name: 'task2',
            isDone: false
          })
        ]
      })
    ];

    //WHEN
    todo.submit({ title: 'card' });
    todo.submitTask({ taskName: 'task' }, 1);
    todo.submitTask({ taskName: 'task2' }, 1);

    //THEN
    const data = todo.allEntries;
    expect(data).toEqual(expected);
    window.localStorage.clear();

  });

  it('should update checkboxes on card (parent)', () => {

    // GIVEN
    const service = TestBed.inject(CRUDService);
    const todo = new TodolistComponent(service);
    const expected = [
      new Card({
        id: 1,
        title: 'card',
        isDone: true,
        tasks: [
          new Task({
            id: 1,
            name: 'task',
            isDone: true
          }),

          new Task({
            id: 2,
            name: 'task2',
            isDone: true
          })
        ]
      })
    ];

    // WHEN
    todo.submit({ title: 'card' });
    todo.submitTask({ taskName: 'task' }, 1);
    todo.submitTask({ taskName: 'task2' }, 1);
    todo.checkboxStatusChange(
      new Card({
        id: 1,
        title: 'card',
        isDone: false,
        tasks: [
          new Task({
            id: 1,
            name: 'task',
            isDone: false
          }),

          new Task({
            id: 2,
            name: 'task2',
            isDone: false
          })
        ]
      })
    );

    // THEN
    const data = todo.allEntries;
    expect(data).toEqual(expected);
    window.localStorage.clear();
  });

  it('should submit deleting a card', () => {
    // GIVEN
    const service = TestBed.inject(CRUDService);
    const todo = new TodolistComponent(service)
    const expected = [
      new Card({
        id: 1,
        title: 'card',
        isDone: false,
        tasks: []
      }),
      new Card({
        id: 2,
        title: 'card1',
        isDone: false,
        tasks: []
      }),
    ];

    // WHEN
    todo.submit({ title: 'card' });
    todo.submit({ title: 'card1' });
    todo.submit({ title: 'card2' });
    todo.deleteEntry(
      new Card({
        id: 3,
        title: 'card2',
        isDone: false,
        tasks: []
      })
    );

    // THEN
    const data = todo.allEntries;
    expect(data).toEqual(expected);
    window.localStorage.clear();
  });

  it('should submit deleting a task', () => {

    // GIVEN
    const service = TestBed.inject(CRUDService);
    const todo = new TodolistComponent(service)
    const expected = [
      new Card({
        id: 1,
        title: 'card',
        isDone: false,
        tasks: [
          new Task({
            id: 1,
            name: 'task',
            isDone: false
          }),

          new Task({
            id: 2,
            name: 'task1',
            isDone: false
          })
        ]
      })
    ];

    // WHEN
    todo.submit('card');
    todo.submitTask({ taskName: 'task' }, 1);
    todo.submitTask({ taskName: 'task1' }, 1);
    todo.submitTask({ taskName: 'task2' }, 1);

    todo.deleteEntry({
      id: 1,
      title: 'card',
      isDone: false,
      tasks: [
        new Task({
          id: 1,
          name: 'task',
          isDone: false
        }),

        new Task({
          id: 2,
          name: 'task1',
          isDone: false
        }),

        new Task({
          id: 3,
          name: 'task2',
          isDone: false
        })
      ]
    }, 3);

    // THEN
    const data = todo.allEntries;
    expect(data).toEqual(expected);
    window.localStorage.clear();
  });

});
