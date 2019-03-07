import {Injectable} from '@angular/core';

import {Todo, TodoTimescale} from '../pages/todo/models/todo.model';

@Injectable()
export class TodoService {

	private static STORAGE_KEY_MIT = 'aMit';
	private static STORAGE_KEY_TODAY= 'aToday';
	private static STORAGE_KEY_LATER = 'aLater';

	private lastInsertId = 0;

	private aMit: Array<Todo> = new Array()
	private aToday: Array<Todo> = new Array();
	private aLater: Array<Todo> = new Array();

	constructor() {
		this.fetch();
		if (this.aMit.length > 0) {
			this.lastInsertId = this.aMit[this.aMit.length - 1].id;
		}
		if (this.aToday.length > 0) {
			this.lastInsertId = this.aToday[this.aToday.length - 1].id;
		}
		if (this.aLater.length > 0) {
			this.lastInsertId = this.aLater[this.aLater.length - 1].id;
		}
	}

	create(todo: Todo, timescale: string): Todo {
		if (todo && todo.title && todo.title.trim().length === 0) {
			return;
		}

		const newTodo = new Todo(++this.lastInsertId, todo.title, timescale, todo.completed);
		switch (timescale) {
			case "MIT":
				this.aMit.push(newTodo);
				break;
			case "Today":
				this.aToday.push(newTodo);
				break;
			case "Later":
				this.aLater.push(newTodo);
				break;
		}
		this.save();
		return newTodo;
	}

	findAllMit() {
		return this.aMit ? this.aMit : [];
	}

	findAllToday() {
		return this.aToday ? this.aToday : [];
	}

	findAllLater() {
		return this.aLater ? this.aLater : [];
	}

	update(todo: Todo) {
		todo.title = todo.title.trim();
		if (todo.title.length === 0) {
			this.delete(todo);
		}
		//this.save();
	}

	delete(todo: Todo) {
		//this.todos = this.todos.filter((t) => t !== todo);
		this.save();
	}

	toggle(todo: Todo, timescale: TodoTimescale) {
		/*switch (timescale) {
			case TodoTimescale.MIT:
				this.aMit = this.aMit.forEach(function (t) {
					return t.completed = !t.completed;
				});
				break;
			case TodoTimescale.Today:
				this.aToday = this.aToday.map((t) => t !== todo);
				break;
			case TodoTimescale.Later:
				this.aLater = this.aLater.map((t) => t !== todo);
				break;
		}*/
		//this.save();
	}

	toggleAll(completed: boolean) {
		//this.todos.forEach((t) => t.completed = completed);
		//this.save();
	}

	clearCompleted() {
		//this.todos = this.todos.filter((t) => !t.completed);
		//this.save();
	}

	private fetch() {
		const aMitPersisted = localStorage.getItem(TodoService.STORAGE_KEY_MIT);
		const aTodayPersisted = localStorage.getItem(TodoService.STORAGE_KEY_TODAY);
		const aLaterPersisted = localStorage.getItem(TodoService.STORAGE_KEY_LATER);
		try {
			this.aMit = JSON.parse(aMitPersisted || '[]');
			this.aToday = JSON.parse(aTodayPersisted || '[]');
			this.aLater = JSON.parse(aLaterPersisted || '[]');
		} catch (ignore) {
			this.aMit = [];
			this.aLater = [];
			this.aToday = [];
		}
	}

	private save(): void {
		localStorage.setItem(TodoService.STORAGE_KEY_MIT, JSON.stringify(this.aMit));
		localStorage.setItem(TodoService.STORAGE_KEY_TODAY, JSON.stringify(this.aToday));
		localStorage.setItem(TodoService.STORAGE_KEY_LATER, JSON.stringify(this.aLater));
	}
}
