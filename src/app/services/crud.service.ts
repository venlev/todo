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

    update(card: object) {
        // delete by id > set a new with the same ID
        this.delete(card['id']);

        const updatedEntry = {
            "id": card["id"],
            "title": card["title"],
            "isDone": !card["isDone"],
            "tasks": card["tasks"]
        }

        const storedEntries = this.todo$.getValue();
        storedEntries.push(updatedEntry);
        storedEntries.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        this.save(storedEntries);
    }

    addTask(taskName: string, parentID: number) {
        const currentData: object[] = this.todo$.getValue();
        const thisEntry = currentData.filter(element => element['id'] === parentID);
        console.log(thisEntry['tasks']);
        const newId = thisEntry['tasks'].length < 1 ? 0 : parseInt(thisEntry["tasks"].length) + 1;

        const newTask = {
            "id": newId,
            "name": taskName,
            "isDone": false,
        }

        currentData.forEach(entry=>{
            if(entry['id'] === parentID){
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