import { JsonPipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
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
        if (this.read()) {
            this.todo$.next(this.read());
        }
    }

    create(value: string) {
        const previousEntries: string = this.get();
        if (previousEntries) { // if there is a previous data inserted
            const previousEntryArray: object[] = JSON.parse(previousEntries);

            const newEntry = {
                "title": null,
                "isDone": false
            }

            newEntry.title = value
            previousEntryArray.push(newEntry);
            const newEntryTable: string = JSON.stringify(previousEntryArray)
            this.set(newEntryTable);
            if (this.read()) this.todo$.next(this.read());
        } else {  // if this will be the first data
            const container: object[] = [];

            const newEntry = {
                "title": null,
                "isDone": false
            }

            newEntry.title = value;
            container.push(newEntry);
            const newEntryTable: string = JSON.stringify(container)
            this.set(newEntryTable);
            if (this.read()) this.todo$.next(this.read());
        }
    }

    read(): string[] {
        if (this.get()) {
            const contents = this.get();
            const finalObject = JSON.parse(contents);

            return finalObject;
        } else {
            return null;
        }
    }

    update(oldEntry: object, updatedEntry: object) {

        const savedEntries: string = this.get();

        if (savedEntries) {
            const savedEntriesArray = JSON.parse(savedEntries);
            let newEntriesArray: object[] = [];

            savedEntriesArray.forEach(entry => { // replace old entry with updated

                if (JSON.stringify(entry) === JSON.stringify(oldEntry)) {
                    newEntriesArray.push(updatedEntry);
                } else {
                    newEntriesArray.push(entry);
                }
            });

            const newEntryTable: string = JSON.stringify(newEntriesArray);
            this.set(newEntryTable);
            if (this.read()) this.todo$.next(this.read());

        }

    }

    delete(cardToDelete: object) {
        if(cardToDelete){
            const oldData: string = this.get();
            const oldList: object[] = JSON.parse(oldData);
            const newList = oldList.filter(listElement=>JSON.stringify(listElement) !== JSON.stringify(cardToDelete));
            const newListString: string = JSON.stringify(newList);
            this.set(newListString);
            if (this.read()) this.todo$.next(this.read());
        }
    }

    private set(contents: string) {
        window.localStorage.setItem('contents', contents);
    }

    private get() {
        return window.localStorage.getItem('contents');
    }
}