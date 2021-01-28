import { CRUDService } from './crud.service';
import { Card } from '../models/card.model';
import { Task } from '../models/task.model';
import { reduce, sample } from 'rxjs/operators';

describe('CRUD Service Test', () => {
    /*
    *  SETTING UP OBSERVABLE'S ENV
    * hereby I can make comparisons
    */

    const CRUD = new CRUDService();

    var localDataset: Card[];
    CRUD.todos.subscribe(data => {
        localDataset = data;
    });


    it('should create a card', () => {
        const sampleTitle = 'test data';
        CRUD.create(sampleTitle);
        let expected = localDataset.find(data => data.title === sampleTitle);
        //console.log(expected)
        expect(expected).toBeTruthy();
        window.localStorage.clear();
    });
    
    it('should create a task on a card', () => {
        const sampleCard = 'test data';
        const sampleTask = {taskName:'sub task'};
        CRUD.create(sampleCard);
        let parent = localDataset.find(data => data.title === sampleCard);
        CRUD.addTask(sampleTask, parent.id);

        let expectedParent = localDataset.find(parents=> parents.title === sampleCard);
        let expected = expectedParent.tasks.find(tasks=>tasks.name === sampleTask.taskName);
        //console.log(expectedParent, expected)
        expect(expected.name).toEqual(sampleTask.taskName);
        window.localStorage.clear();
    });
    
    it('should generate an Id for next card', () => {
        const sampleText = 'test data';
        CRUD.create(sampleText);
        let OLDMaxID = localDataset.reduce((acc, curr) => {
            if (curr.id > acc.id) {
                return curr;
            }
        });
        CRUD.create(`${sampleText}2`);
        let expected = localDataset.find(data => data.title === `${sampleText}2`);
        //console.log(expected.id, OLDMaxID.id)
        expect(expected.id).toBeGreaterThan(OLDMaxID.id);
        window.localStorage.clear();
    });

    it('should update a card', () => {
        const mockCard = 'test data';
        CRUD.create(mockCard);
        CRUD.update(localDataset.find(data => data.title === mockCard));
        let expected = localDataset.find(data => data.title === mockCard);

        //console.log(expected)
        expect(expected.isDone).toBeTrue();
        window.localStorage.clear();
    });

    it('should update a task on a card', () => {
        const mockCard = 'test data';
        const mockTask = { taskName: 'mock task'}
        CRUD.create(mockCard);
        const parentID = localDataset.find(cards=>cards.title === mockCard).id;
        CRUD.addTask(mockTask, parentID);
        let parentCard = localDataset.find(cards=>cards.title === mockCard);
        let testTask = parentCard.tasks.find(data => data.name === mockTask.taskName)
        CRUD.update(testTask, parentCard);
        parentCard = localDataset.find(cards=>cards.title === mockCard); // update parent
        let expected = parentCard.tasks.find(data => data.name === mockTask.taskName);

        //console.log(expected)
        expect(expected.isDone).toBeTrue();
        window.localStorage.clear();
    });
 

    /// többször előfordulnak a kártyák :z
    /*
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
        window.localStorage.clear();
    });
    */
    it('should delete a task', () => {
        const mockData = 'test data 123';
        const taskWeWillDelete = {taskName: 'this task we will delete'};
        CRUD.create(mockData);
        let parentTask: Card = localDataset.find(cards => cards.title === mockData);
        CRUD.addTask(taskWeWillDelete, parentTask.id);
        CRUD.addTask({taskName:'taskame two'}, parentTask.id);
        parentTask = localDataset.find(cards => cards.title === mockData); // refresh parent 
        CRUD.deleteTask(parentTask, parentTask.tasks.find(tasks => tasks.name === taskWeWillDelete.taskName).id);
        //*LOG*/parentTask.tasks.forEach(task=>console.log('task is',task));
        parentTask = localDataset.find(cards => cards.title === mockData); // refresh parent
        let expected = '';
        parentTask.tasks.forEach(task=>{
            if(task.name === taskWeWillDelete.taskName) expected = task.name;
        });
        //console.log(parentTask, localDataset, expected);
        expect(expected).not.toEqual(taskWeWillDelete.taskName);
        window.localStorage.clear();
    });



});
