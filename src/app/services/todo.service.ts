import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Todo, TodoTimescale } from '../members/todo/models/todo.model';

const STORAGE_KEY_MIT = 'aMit';
const STORAGE_KEY_TODAY= 'aToday';
const STORAGE_KEY_LATER = 'aLater';

@Injectable()
export class TodoService {

	private aMit: Array<Todo> = new Array()
	private aToday: Array<Todo> = new Array();
	private aLater: Array<Todo> = new Array();

	constructor(private storage: Storage) {
		this.fetch();
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

	create(todo: Todo, timescale: string): Todo {

		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}

		const newTodo = new Todo(this.getRandomInt(), todo.title, timescale, todo.completed);
		console.log(`Create ${JSON.stringify(newTodo)}`);
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

	update(todo: Todo, timescale: TodoTimescale) {
		
		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}
		console.log(`Update ${JSON.stringify(todo)}`);
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.MIT:
				currentTodoIndex = this.aMit.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aMit[currentTodoIndex] = this.aMit[currentTodoIndex];
				}
				break;
			case TodoTimescale.Today:
				currentTodoIndex = this.aToday.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aToday[currentTodoIndex] = this.aToday[currentTodoIndex];
				}
				break;
			case TodoTimescale.Later:
				currentTodoIndex = this.aLater.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aLater[currentTodoIndex] = this.aLater[currentTodoIndex];
				}
				break;
		}
		this.save();
	}

	delete(todo: Todo, timescale: TodoTimescale) {
		console.log(`Delete ${JSON.stringify(todo)} `);
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
		console.log(`Toggle ${JSON.stringify(todo)} in ${timescale} ...`);
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.MIT:
				currentTodoIndex = this.aMit.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aMit[currentTodoIndex].completed = !this.aMit[currentTodoIndex].completed;
				}
				break;
			case TodoTimescale.Today:
				currentTodoIndex = this.aToday.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aToday[currentTodoIndex].completed = !this.aToday[currentTodoIndex].completed;
				}
				break;
			case TodoTimescale.Later:
				currentTodoIndex = this.aLater.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aLater[currentTodoIndex].completed = !this.aLater[currentTodoIndex].completed;
				}
				break;
		}
		this.save();
	}

	private fetch() {
		console.log(`Fetch all lists ...`);
		this.fetchMit();
		this.fetchToday();
		this.fetchLater();
	}

	private fetchMit(){
		return this.storage.get(STORAGE_KEY_MIT).then(aMitPersisted => {
			try {
				this.aMit = JSON.parse(aMitPersisted || '[]');
			} catch (ignore) {
				this.aMit = new Array();
			}
		});
	}

	private fetchToday(){
		return this.storage.get(STORAGE_KEY_TODAY).then(aTodayPersisted => {
			try {
				this.aToday = JSON.parse(aTodayPersisted || '[]');
			} catch (ignore) {
				this.aToday = new Array();
			}
		});
	}

	private fetchLater(){
		return this.storage.get(STORAGE_KEY_LATER).then(aLaterPersisted => {
			try {
				this.aLater = JSON.parse(aLaterPersisted || '[]');
			} catch (ignore) {
				this.aLater = new Array();
			}
		});
	}

	private save(): void {
		console.log(`Saving all lists ...`);
		this.saveMit();
		this.saveToday();
		this.saveLater();
	}

	private saveMit(){
		return this.storage.set(STORAGE_KEY_MIT, JSON.stringify(this.aMit)).then(() => {
			console.log('STORAGE_KEY_MIT stored succesfully ');
		});
	}

	private saveToday(){
		return this.storage.set(STORAGE_KEY_TODAY, JSON.stringify(this.aToday)).then(() => {
			console.log('STORAGE_KEY_TODAY stored succesfully ');
		});
	}

	private saveLater(){
		return this.storage.set(STORAGE_KEY_LATER, JSON.stringify(this.aLater)).then(() => {
			console.log('STORAGE_KEY_LATER stored succesfully ');
		});	
	}

	private getRandomInt() {
		return Math.floor(Math.random() * (9999999999 - 0)) + 1;
	}
}
