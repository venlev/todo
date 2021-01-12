import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CRUDService {
    create(value: string) {

    }

    read() {

    }

    update(newValue: string) {

    }

    delete() {

    }

    private set(contents: string) {
        window.localStorage.setItem('contents', contents)
    }

    private get() {
        return window.localStorage.getItem('contents');
    }
}