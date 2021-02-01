import { CRUDService } from './crud.service';
import { Card } from '../models/card.model';
import { Task } from '../models/task.model';
import { TestBed } from '@angular/core/testing';

describe('CRUD Service Test', () => {
    /*
    *  SETTING UP OBSERVABLE'S ENV
    * hereby I can make comparisons
    */

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CRUDService]
        })
    });

    it('should create a card', async (done) => {
        //GIVEN
        const service = TestBed.inject(CRUDService);
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
        service.create('card');
        service.create('card2')

        //THEN
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });
    });

    it('should create a task on a card', async (done) => {

        //GIVEN
        const service = TestBed.inject(CRUDService);
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
        service.create('card');
        service.addTask({ taskName: 'task' }, 1);
        service.addTask({ taskName: 'task2' }, 1);

        //THEN
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });

    });


    it('should update a card', async (done) => {

        // GIVEN
        const service = TestBed.inject(CRUDService);
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
        service.create('card');
        service.addTask({ taskName: 'task' }, 1);
        service.addTask({ taskName: 'task2' }, 1);
        service.update(
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
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });
    });

    it('should update a task on a card', async (done) => {

        // GIVEN
        const service = TestBed.inject(CRUDService);
        const expected = [
            new Card({
                id: 1,
                title: 'card',
                isDone: false,
                tasks: [
                    new Task({
                        id: 1,
                        name: 'task',
                        isDone: true
                    }),

                    new Task({
                        id: 2,
                        name: 'task2',
                        isDone: false
                    })
                ]
            })
        ];

        // WHEN
        service.create('card');
        service.addTask({ taskName: 'task' }, 1);
        service.addTask({ taskName: 'task2' }, 1);
        service.update(
            new Task({
                id: 1,
                name: 'task',
                isDone: false
            }),

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
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });
    });

    it('should delete a card', async (done) => {
        // GIVEN
        const service = TestBed.inject(CRUDService);
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
        service.create('card');
        service.create('card1');
        service.create('card2');
        service.delete(3);

        // THEN
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });
    });


    it('should delete a task', async (done) => {

        // GIVEN
        const service = TestBed.inject(CRUDService);
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
        service.create('card');
        service.addTask({ taskName: 'task' }, 1);
        service.addTask({ taskName: 'task1' }, 1);
        service.addTask({ taskName: 'task2' }, 1);

        service.deleteTask({
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
        service.todos.subscribe(data => {
            expect(data).toEqual(expected);
            window.localStorage.clear();
            done()
        });
    });

});
