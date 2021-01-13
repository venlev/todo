import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {

    create(value: string) {
        // create an entry such like
        // "bejegyzés": {}
    }

    read() {

    }

    update(oldValue: string, newValue:string) {

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