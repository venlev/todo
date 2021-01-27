import { Task } from './task.model';

describe('Task Model Test', () => {
  it('should create a task model', () => {
    const task = {
        id: 1,
        name: 'test-title',
        isDone: true,
    };
    const actual = new Task(task);
    expect(actual.id).toEqual(1);
    expect(actual.name).toEqual('test-title');
    expect(actual.isDone).toEqual(true);
  });
});
