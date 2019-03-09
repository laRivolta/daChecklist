import {Injectable} from '@angular/core';

import {Todo, TodoTimescale} from '../pages/todo/models/todo.model';

@Injectable()
export class TodoService {

	private static STORAGE_KEY_MIT = 'aMit';
	private static STORAGE_KEY_TODAY= 'aToday';
	private static STORAGE_KEY_LATER = 'aLater';

	private aMit: Array<Todo> = new Array()
	private aToday: Array<Todo> = new Array();
	private aLater: Array<Todo> = new Array();

	constructor() {
		this.fetch();
	}

	create(todo: Todo, timescale: string): Todo {
		//console.log(`Create ${JSON.stringify(todo)} inside ${timescale}`);
		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}

		const newTodo = new Todo(this.getRandomInt(), todo.title, timescale, todo.completed);
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
		//console.log(`Fetch Mit's`);
		return this.aMit ? this.aMit : [];
	}

	findAllToday() {
		//console.log(`Fetch Today's`);
		return this.aToday ? this.aToday : [];
	}

	findAllLater() {
		//console.log(`Fetch Later's`);
		return this.aLater ? this.aLater : [];
	}

	update(todo: Todo, timescale: string) {

		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}

		this.save();
	}

	delete(todo: Todo, timescale: TodoTimescale) {
		//console.log(`Delete ${JSON.stringify(todo)} from ${timescale} ...`);
		switch (timescale) {
			case TodoTimescale.MIT:
				this.aMit = this.aMit.filter((t) => t.id !== todo.id);
				break;
			case TodoTimescale.Today:
				this.aToday = this.aToday.filter((t) => t.id !== todo.id);
				break;
			case TodoTimescale.Later:
				this.aLater = this.aLater.filter((t) => t.id !== todo.id);
				break;
		}
		this.save();
	}

	toggle(todo: Todo, timescale: TodoTimescale) {
		//console.log(`Toggle ${JSON.stringify(todo)} in ${timescale} ...`);
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.MIT:
				currentTodoIndex = this.aMit.findIndex(t => todo.id === t.id);
				if (currentTodoIndex > 0) {
					this.aMit[currentTodoIndex].completed = !this.aMit[currentTodoIndex].completed;
				}
				break;
			case TodoTimescale.Today:
				currentTodoIndex = this.aToday.findIndex(t => todo.id === t.id);
				if (currentTodoIndex > 0) {
					this.aToday[currentTodoIndex].completed = !this.aToday[currentTodoIndex].completed;
				}
				break;
			case TodoTimescale.Later:
				currentTodoIndex = this.aLater.findIndex(t => todo.id === t.id);
				if (currentTodoIndex > 0) {
					this.aLater[currentTodoIndex].completed = !this.aLater[currentTodoIndex].completed;
				}
				break;
		}
		this.save();
	}

	private fetch() {
		//console.log(`Fetch all lists ...`);
		const aMitPersisted = localStorage.getItem(TodoService.STORAGE_KEY_MIT);
		const aTodayPersisted = localStorage.getItem(TodoService.STORAGE_KEY_TODAY);
		const aLaterPersisted = localStorage.getItem(TodoService.STORAGE_KEY_LATER);
		try {
			this.aMit = JSON.parse(aMitPersisted || '[]');
			this.aToday = JSON.parse(aTodayPersisted || '[]');
			this.aLater = JSON.parse(aLaterPersisted || '[]');
		} catch (ignore) {
			this.aMit = new Array();
			this.aLater = new Array();
			this.aToday = new Array();
		}
	}

	private save(): void {
		console.log(`Saving all lists ...`);
		localStorage.setItem(TodoService.STORAGE_KEY_MIT, JSON.stringify(this.aMit));
		localStorage.setItem(TodoService.STORAGE_KEY_TODAY, JSON.stringify(this.aToday));
		localStorage.setItem(TodoService.STORAGE_KEY_LATER, JSON.stringify(this.aLater));
	}

	private getRandomInt() {
		return Math.floor(Math.random() * (9999999999 - 0)) + 1;
	}
}
