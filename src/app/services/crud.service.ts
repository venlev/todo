import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { Task } from '../models/task.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {

    private todo$: BehaviorSubject<Card[]> = new BehaviorSubject([])

    get todos(): Observable<Card[]> {
        return this.todo$.pipe(
            map((cards) => {
                return cards.map(c => new Card(c))
            })
        )
    }

    init() {
        if (this.get()) {
            this.todo$.next(this.get());
        }
    }

    create(value: string) {
        const targetList: Card[] = this.todo$.getValue();
        let maxId = 0;

        targetList.forEach(element => { // get the last id
            const id = element.id;
            if (id > maxId) {
                maxId = id;
            }
        })

        const newEntry: Card = {
            id: maxId + 1,
            title: value,
            isDone: false,
            tasks: []
        }

        targetList.push(newEntry);

        this.save(targetList);

    }

    update(element: Task | Card, parent?: Card) {
        let recentElements: Card[] = this.todo$.getValue();
        
        if (parent) {
            const originalElement:Card = recentElements.find(topLevelTask => topLevelTask.id === parent.id);
            const isAllCheckedBefore = originalElement.tasks.every(subTask => subTask.isDone);
            const originalTask = originalElement.tasks.find(tasks=> tasks.id === element.id);
            originalTask.isDone = !originalTask.isDone;
            if (isAllCheckedBefore) {
                originalElement.isDone = false;    
            }

        } else {
            const localElement: Card = recentElements.find(cardInContext => cardInContext.id === element.id)
            localElement.isDone = !localElement.isDone;
            (localElement as Card).tasks.map(task => {
                task.isDone = true;
            });
        }

        this.save(recentElements);  // saving the object with the updated reference value

        if (parent) {
            let savedElements: Card[] = this.todo$.getValue();
            const newParent: Card = savedElements.find(topLevelTasks => topLevelTasks.id === parent.id);
            const checkIfEveryIsDone = newParent.tasks.every(task => task.isDone);
            if (checkIfEveryIsDone) newParent.isDone = true;

            this.save(savedElements);
        }
    }

    addTask(taskName: string, parentID: number) {
        const currentData: Card[] = this.todo$.getValue();
        const thisEntry:Card = currentData.find(element => element.id === parentID);

        const newId = thisEntry.tasks.length < 1 ? 1 : thisEntry.tasks[thisEntry.tasks.length-1].id + 1;

        const newTask: Task = {
            id: newId,
            name: taskName['taskName'],
            isDone: false,
        }

        currentData.forEach(entry => {
            if (entry.id === parentID) {
                entry.tasks.push(newTask);
            }
        });

        this.save(currentData);
        this.refreshChecklist(thisEntry);
    }

    delete(id: number) {
        if (id) {
            const currentData: Card[] = this.todo$.getValue();
            const newList = currentData.filter(element => element.id !== id);
            this.save(newList);
        }
    }

    deleteTask(parent: Card, childID: number) {
        const filteredChildren:Task[] = parent.tasks.filter(child => child.id !== childID);
        parent.tasks = filteredChildren;
        const currentData: Card[] = this.todo$.getValue();
        const newDataset = currentData.filter(parents => parents.id !== parent.id);
        newDataset.push(parent);
        newDataset.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        this.save(newDataset);
        this.refreshChecklist(parent);
    }

    save(list: Card[]) {
        this.set(list);
        if (this.get()) this.todo$.next(this.get());
    }

    refreshChecklist(modifiedSubtodoParent: Card) {
        const store: Card[] = this.todo$.getValue();
        if (modifiedSubtodoParent) {
            const storedParent = store.find(parent => parent.id === modifiedSubtodoParent.id);
            const fellowSubtodos = storedParent.tasks;
            const isAllChecked = fellowSubtodos.every(fellow => fellow.isDone);

            if (isAllChecked) {
                storedParent.isDone = true;
            } else {
                storedParent.isDone = false;
            }
            this.save(store);
        }
    }

    private set(contents: object[]) {
        window.localStorage.setItem('contents', JSON.stringify(contents));
    }

    private get() {
        const contents = window.localStorage.getItem('contents');
        if (contents) {
            return JSON.parse(contents);
        } else {
            return []
        }
    }
}