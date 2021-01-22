export class Task{
    id: number;
    name: string;
    isDone: boolean;

    constructor(task: {id: number, name: string, isDone: boolean}){
        this.id = task.id,
        this.name = task.name,
        this.isDone = task.isDone;
    }
}