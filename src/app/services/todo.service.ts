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
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.MIT:
				currentTodoIndex = this.aMit.findIndex(t => todo.id == t.id);
				this.aMit[currentTodoIndex].completed = !this.aMit[currentTodoIndex].completed;
				break;
			case TodoTimescale.Today:
				currentTodoIndex = this.aToday.findIndex(t => todo.id == t.id);
				this.aToday[currentTodoIndex].completed = !this.aToday[currentTodoIndex].completed;
				break;
			case TodoTimescale.Later:
				currentTodoIndex = this.aLater.findIndex(t => todo.id == t.id);
				this.aLater[currentTodoIndex].completed = !this.aLater[currentTodoIndex].completed;
				break;
		}
		this.save();
	}

	private fetch() {
		console.log(`Fetch all lists ...`);
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
		console.log(`Saving all lists ...`);
		localStorage.setItem(TodoService.STORAGE_KEY_MIT, JSON.stringify(this.aMit));
		localStorage.setItem(TodoService.STORAGE_KEY_TODAY, JSON.stringify(this.aToday));
		localStorage.setItem(TodoService.STORAGE_KEY_LATER, JSON.stringify(this.aLater));
	}
}
