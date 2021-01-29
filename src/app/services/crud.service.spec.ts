import { CRUDService } from './crud.service';
import { Card } from '../models/card.model';
import { Task } from '../models/task.model';
import { TestBed } from '@angular/core/testing';

describe('CRUD Service Test', () => {
    /*
    *  SETTING UP OBSERVABLE'S ENV
    * hereby I can make comparisons
    */

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [CRUDService]
        })
    });

    fit('should create a card', async (done) => {
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
/*
    it('should create a task on a card', () => {

        CRUD.create('card');
        CRUD.addTask({ taskName: 'task' }, 1);
        CRUD.addTask({ taskName: 'task2' }, 1);
        console.log(localDataset);
        const actual = localDataset;
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

        expect(actual).toEqual(expected);
    });


    it('should update a card', () => {
        CRUD.create('card');
        CRUD.addTask({ taskName: 'task' }, 1);
        CRUD.addTask({ taskName: 'task2' }, 1);
        CRUD.update(
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

        console.log(localDataset);
        const actual = localDataset;
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

        expect(actual).toEqual(expected);

    });

    it('should update a task on a card', () => {
        CRUD.create('card');
        CRUD.addTask({ taskName: 'task' }, 1);
        CRUD.addTask({ taskName: 'task2' }, 1);
        CRUD.update(
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

        console.log(localDataset);
        const actual = localDataset;
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

        expect(actual).toEqual(expected);
    });

    /*
    /// többször előfordulnak a kártyák :z
    
    it('should delete a card', () => {
        const mockData = 'test data';
        CRUD.create(mockData);
        CRUD.create('something to fill up');
        CRUD.create('another card with random data');
        let mockCard = localDataset.find(cards => cards.title === mockData)
        CRUD.delete(mockCard.id);
        let expected = localDataset.find(data => data.title === mockData);
        console.log(localDataset, expected);
        //console.log(expected)
        expect(expected).toBeFalsy();
        
    });
    
 
    it('should delete a task', () => {
        const mockData = 'test data 123';
        const taskWeWillDelete = {taskName: 'this task we will delete'};
        CRUD.create(mockData);
        let parentTask: Card = localDataset.find(cards => cards.title === mockData);
        CRUD.addTask(taskWeWillDelete, parentTask.id);
        CRUD.addTask({taskName:'taskame two'}, parentTask.id);
        parentTask = localDataset.find(cards => cards.title === mockData); // refresh parent 
        CRUD.deleteTask(parentTask, parentTask.tasks.find(tasks => tasks.name === taskWeWillDelete.taskName).id);
        parentTask.tasks.forEach(task=>console.log('task is',task));
        parentTask = localDataset.find(cards => cards.title === mockData); // refresh parent
        let expected = '';
        parentTask.tasks.forEach(task=>{
            if(task.name === taskWeWillDelete.taskName) expected = task.name;
        });
        //console.log(parentTask, localDataset, expected);
        expect(expected).not.toEqual(taskWeWillDelete.taskName);
        
    });
 
*/

});
