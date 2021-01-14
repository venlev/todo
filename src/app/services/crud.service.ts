import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {

    private todo$: BehaviorSubject<any[]> = new BehaviorSubject([])

    get todos(): Observable<any[]>{
        return this.todo$.asObservable();
    }

    init(){
        if(this.read()){
            this.todo$.next(this.read());
        }
    }

    create(value: string) {
        const previousEntries: string = this.get();
        const newEntry = `{ "title":"${value}" , "isDone": false }`;
        let entrytocreate = previousEntries ? `${previousEntries}; ${newEntry}` :  `${newEntry}`;
        this.set(entrytocreate);
        if(this.read()) this.todo$.next(this.read());
    }

    read(): string[] {
        if (this.get()) {
            const contents = this.get();
            //console.log(contents)
            const finalObject = contents.split(';');
        
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