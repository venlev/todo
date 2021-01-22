import {Task} from './task.model';

export class Card{
    id: number;
    title: string;
    isDone: boolean;
    tasks: Task[];

    constructor(card: {id: number, title:string, isDone:boolean, tasks: object[]}){
        this.id = card.id;
        this.title = card.title,
        this.isDone = card.isDone;
        this.tasks; // itt kéne lefaktorálni a Task() - modellel a dolgot
    }
}