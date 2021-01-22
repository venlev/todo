import {Task} from './task.model';

export class Card{
    id: number;
    title: string;
    isDone: boolean;
    tasks: Task[];
}