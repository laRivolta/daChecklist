import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Todo, TodoTimescale } from '../pages/member/todo/models/todo.model';

const STORAGE_KEY_MIT = 'aPriority1';
const STORAGE_KEY_TODAY= 'aPriority2';

@Injectable()
export class TodoService {

	private aPriority1: Array<Todo> = new Array()
	private aPriority2: Array<Todo> = new Array();

	constructor(private storage: Storage) {
		this.fetch();
	}

	findAllPriority1(): Array<Todo> {
		//console.log(`Fetch Priority 1 todo's`);
		return this.aPriority1 ? this.aPriority1 : [];
	}

	findAllPriority2(): Array<Todo> {
		//console.log(`Fetch Priority 2 todo's`);
		return this.aPriority2 ? this.aPriority2 : [];
	}

	create(todo: Todo, timescale: string): Todo {

		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}

		const newTodo = new Todo(this.getRandomInt(), todo.title, timescale, todo.completed);
		console.log(`Create ${JSON.stringify(newTodo)}`);
		switch (timescale) {
			case "Today":
				this.aPriority1.push(newTodo);
				break;
			case "Later":
				this.aPriority2.push(newTodo);
				break;
		}
		this.save();
		return newTodo;
	}

	update(todo: Todo, timescale: TodoTimescale): void {
		
		if (todo && todo.title && todo.title.trim().length === 0) {
			console.error(`Empty title in ${JSON.stringify(todo)}`);
			return;
		}
		console.log(`Update ${JSON.stringify(todo)}`);
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.Priority1:
				currentTodoIndex = this.aPriority1.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aPriority1[currentTodoIndex] = this.aPriority1[currentTodoIndex];
				}
				break;
			case TodoTimescale.Priority2:
				currentTodoIndex = this.aPriority2.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aPriority2[currentTodoIndex] = this.aPriority2[currentTodoIndex];
				}
				break;
		}
		this.save();
	}

	delete(todo: Todo, timescale: TodoTimescale): void {
		console.log(`Delete ${JSON.stringify(todo)} `);
		switch (timescale) {
			case TodoTimescale.Priority1:
				this.aPriority1 = this.aPriority1.filter((t) => t.id !== todo.id);
				break;
			case TodoTimescale.Priority2:
				this.aPriority2 = this.aPriority2.filter((t) => t.id !== todo.id);
				break;
		}
		this.save();
	}

	toggle(todo: Todo, timescale: TodoTimescale): void {
		console.log(`Toggle ${JSON.stringify(todo)} in ${timescale} ...`);
		let currentTodoIndex = -1;
		switch (timescale) {
			case TodoTimescale.Priority1:
				currentTodoIndex = this.aPriority1.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aPriority1[currentTodoIndex].completed = !this.aPriority1[currentTodoIndex].completed;
				}
				break;
			case TodoTimescale.Priority2:
				currentTodoIndex = this.aPriority2.findIndex(t => todo.id === t.id);
				if (currentTodoIndex >= 0) {
					this.aPriority2[currentTodoIndex].completed = !this.aPriority2[currentTodoIndex].completed;
				}
				break;
		}
		this.save();
	}

	private fetch(): void {
		console.log(`Fetch all lists ...`);
		this.fetchPriority1();
		this.fetchPriority2();
	}

	private fetchPriority1(): Promise<any>{
		return this.storage.get(STORAGE_KEY_MIT).then(aPriority1Persisted => {
			try {
				this.aPriority1 = JSON.parse(aPriority1Persisted || '[]');
			} catch (ignore) {
				this.aPriority1 = new Array();
			}
		});
	}

	private fetchPriority2(): Promise<any> {
		return this.storage.get(STORAGE_KEY_TODAY).then(aPriority2Persisted => {
			try {
				this.aPriority2 = JSON.parse(aPriority2Persisted || '[]');
			} catch (ignore) {
				this.aPriority2 = new Array();
			}
		});
	}

	save(): void {
		console.log(`Saving all lists ...`);
		this.savePriority1();
		this.savePriority2();
	}

	private savePriority1(): Promise<any>{
		return this.storage.set(STORAGE_KEY_MIT, JSON.stringify(this.aPriority1)).then(() => {
			console.log('STORAGE_KEY_MIT stored succesfully ');
		});
	}

	private savePriority2(): Promise<any>{
		return this.storage.set(STORAGE_KEY_TODAY, JSON.stringify(this.aPriority2)).then(() => {
			console.log('STORAGE_KEY_TODAY stored succesfully ');
		});
	}

	private getRandomInt(): number {
		return Math.floor(Math.random() * (9999999999 - 0)) + 1;
	}
}
