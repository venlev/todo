import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {

    private todo$: BehaviorSubject<any[]> = new BehaviorSubject([])

    get todos(): Observable<any[]> {
        return this.todo$.asObservable();
    }

    init() {
        if (this.get()) {
            this.todo$.next(this.get());
        }
    }

    create(value: string) {
        const targetList = this.todo$.getValue();
        let maxId = 0;

        targetList.forEach(element => { // get the last id
            const id = element.id;
            if (id > maxId) {
                maxId = id;
            }
        })

        const newEntry = {
            "id": maxId + 1,
            "title": value,
            "isDone": false,
            "tasks": []
        }

        targetList.push(newEntry);

        this.save(targetList);

    }

    update(card: object, isInternal?: string) {
        this.delete(card['id']);
        let updatedEntry: object = {};

        if (isInternal !== 'internal') {

            // set all sub tasks isDone flag to true
            card['tasks'].map(task => {
                if (!card['isDone']) {
                    task['isDone'] = true;
                }
                return task;
            })

            updatedEntry = {
                "id": card["id"],
                "title": card["title"],
                "isDone": !card["isDone"],
                "tasks": card["tasks"]
            }
        } else {
            updatedEntry = card;
        }

        const storedEntries = this.todo$.getValue();
        storedEntries.push(updatedEntry);
        storedEntries.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        this.save(storedEntries);
    }

    addTask(taskName: string, parentID: number) {
        const currentData: object[] = this.todo$.getValue();
        const thisEntry = currentData.filter(element => element['id'] === parentID);
        const newId = thisEntry[0]['tasks'].length < 1 ? 1 : parseInt(thisEntry[0]['tasks'].length) + 1;

        const newTask = {
            "id": newId,
            "name": taskName['taskName'],
            "isDone": false,
        }

        currentData.forEach(entry => {
            if (entry['id'] === parentID) {
                entry['tasks'].push(newTask);
            }
        });

        this.save(currentData);
    }

    updateTask(task: object, parent: object) {

        let oneTask = parent['tasks'].filter(taskNode => taskNode['name'] === task['name']);

        let modifiedTask = {
            "id": task['id'],
            "name": task['name'],
            "isDone": !oneTask[0]['isDone']
        }

        let newTaskList = parent['tasks'].map(taskNode => taskNode['id'] === modifiedTask['id'] ? modifiedTask : taskNode);
        parent['tasks'] = newTaskList;
        this.update(parent, 'internal');
    }

    delete(id: number) {
        if (id) {
            const currentData: object[] = this.todo$.getValue();
            const newList = currentData.filter(element => element['id'] !== id);
            this.save(newList);
        }
    }

    deleteTask(parent: object, childID: number){
        /*
        1) a parent['tasks'] - on belül filterrel kiszülni, ahol az id != childID-val
        2) updatelni a parent tasksjait
        3) updatelni az egész datasetet
        */

        const filteredChildren = parent['tasks'].filter(child=>child.id !== childID);
        parent['tasks']  = filteredChildren;
        const currentData: object[] = this.todo$.getValue();
        const newDataset = currentData.filter(parents=>parents['id'] !== parent['id']);
        newDataset.push(parent);
        newDataset.sort((a, b) => (a['id'] > b['id']) ? 1 : ((b['id'] > a['id']) ? -1 : 0));
        this.save(newDataset);
    }

    save(list: object[]) {
        this.set(list);
        if (this.get()) this.todo$.next(this.get());
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