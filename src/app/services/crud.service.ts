import { JsonPipe } from '@angular/common';
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
        }else{  // if this will be the first data
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
            const finalObject = JSON.parse(contents)

            return finalObject;
        } else {
            return null;
        }
    }

    update(oldValue: string, newValue: string) {
        // this function is not in the requirements yet 
    }

    delete(name: string) {

    }

    private set(contents: string) {
        window.localStorage.setItem('contents', contents);
    }

    private get() {
        return window.localStorage.getItem('contents');
    }
}