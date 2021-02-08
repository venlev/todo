import {Task} from './task.model';

/**
 * Card type model
 * 
 * this expects every parameter of a card
 * @id
 * @title
 * @isDone
 * @tasks
 */
export class Card{
    id: number;
    title: string;
    isDone: boolean;
    tasks: Task[];

    constructor(card: {id: number, title:string, isDone:boolean, tasks: Task[]}){
        this.id = card.id;
        this.title = card.title,
        this.isDone = card.isDone;
        this.tasks = card.tasks.map(task=>new Task(task))
    }
}