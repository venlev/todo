import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {

    create(value: string) {
        // create an entry such like
        // "bejegyzés": {}
        const previousEntries = this.get() ? this.get() : 'empty';
        const newEntry = `${value}:{ isDone: false }`;

        if (previousEntries !== 'empty') {
            let innerContents = previousEntries.substr(1, length - 1);
            const newContents = `{${innerContents}, \n ${newEntry}}`;
        } else {
            const newContents = `{${newEntry}}`
        }

    }

    read() {
        if (this.get()) {
            const contents = this.get();
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