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

    create(value: string) {
        const previousEntries: string = this.get();
        console.log(previousEntries);
        const newEntry = `"${value}":{ "isDone": false }`;
        
        let entrytocreate = [...previousEntries, newEntry]

        if(previousEntries){
            entrytocreate.forEach(element => {
                
            });
        }else{
            
        }
    }

    read() {
        if (this.get()) {
            const contents = this.get();
            console.log(contents)
            const finalObject = JSON.parse(contents);

            return finalObject;
        } else {
            return 'empty'
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