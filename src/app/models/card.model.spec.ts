import { Card } from './card.model';
import { Task } from './task.model';


describe('Card Model Test', () => {
    it('shold create a card model', () => {
        const card = {
            id: 1,
            title: 'test-title',
            isDone: true,
            tasks: [
                new Task({
                    id: 1,
                    name: 'test-title',
                    isDone: true,
                }),
                new Task({
                    id: 2,
                    name: 'test2-title',
                    isDone: false,
                })
            ]
        };
        const actual = new Card(card);
        expect(actual.id).toEqual(1);
        expect(actual.title).toEqual('test-title');
        expect(actual.isDone).toEqual(true);
        expect(actual.tasks).toEqual([
            new Task({
                id: 1,
                name: 'test-title',
                isDone: true,
            }),
            new Task({
                id: 2,
                name: 'test2-title',
                isDone: false,
            })
        ]);
    });
});
