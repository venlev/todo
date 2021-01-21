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

    update(element: object, parent?: object) {
        let recentElements = this.todo$.getValue();
        if (parent) {
            const originalElement = recentElements.find(topLevelTask => topLevelTask['id'] === parent['id']);
            const isAllCheckedBefore = originalElement['tasks'].every(subTask => subTask['isDone']);

            if (isAllCheckedBefore) {
                parent['isDone'] = false;
                element['isDone'] = !element['isDone'];
            } else {
                element['isDone'] = !element['isDone'];
            }

            console.log(originalElement, isAllCheckedBefore);
        } else {
            element['isDone'] = !element['isDone'];
            element['tasks'].map(task => {
                task['isDone'] = true;
            });

        }
        
        this.save(recentElements);  // saving the object with the updated reference value
        
        if(parent){
            let recentElements = this.todo$.getValue();
            const newParent = recentElements.find(topLevelTasks=> topLevelTasks['id'] === parent['id']);
            const checkIfEveryIsDone = newParent['tasks'].every(task=>task['isDone']);
            if(checkIfEveryIsDone) newParent['isDone'] = true;

            this.save(recentElements);
        }
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

    delete(id: number) {
        if (id) {
            const currentData: object[] = this.todo$.getValue();
            const newList = currentData.filter(element => element['id'] !== id);
            this.save(newList);
        }
    }

    deleteTask(parent: object, childID: number) {
        
        const filteredChildren = parent['tasks'].filter(child => child.id !== childID);
        parent['tasks'] = filteredChildren;
        const currentData: object[] = this.todo$.getValue();
        const newDataset = currentData.filter(parents => parents['id'] !== parent['id']);
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