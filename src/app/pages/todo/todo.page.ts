import { Component, DoCheck, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';

import { Todo, TodoUtils, TodoTimescale } from './models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
	selector: 'app-todo',
	templateUrl: 'todo.page.html',
	styleUrls: ['todo.page.scss'],
	providers: [ TodoService ]
})
export class TodoPage implements OnInit, DoCheck {
	
	aMit: Array<Todo> = new Array();
	aToday: Array<Todo> = new Array();
	aLater: Array<Todo> = new Array();
		
	selectedQuadrant: string = "MIT";

	newTodo: Todo = new Todo(0,'');
	editing: boolean = false;
	 
	constructor(private todoService: TodoService, private dragulaService: DragulaService, private toastController: ToastController) {

		this.dragulaService.drag('bag')
			.subscribe(({ name, el, source }) => {
				
			});
	
		this.dragulaService.removeModel('bag')
			.subscribe(({ item }) => {
				this.delete(item, 0);
			});
	
		this.dragulaService.dropModel('bag')
			.subscribe(({ item }) => {
		});
	
		this.dragulaService.createGroup('bag', {
			removeOnSpill: true
		});
	}

	ngOnInit() {
		this.aMit = this.todoService.findAllMit();
		this.aToday = this.todoService.findAllToday();
		this.aLater = this.todoService.findAllLater();
	}

	ngDoCheck() {
		this.aMit = this.todoService.findAllMit();
		this.aToday = this.todoService.findAllToday();
		this.aLater = this.todoService.findAllLater();
	}
	
	// ~ crud

	addTodo() {
		//!this.editing ? this.create(this.newTodo) : this.update(this.newTodo);
		this.create(this.newTodo);
		this.clearForm();
	}

	private create(todo: Todo) {
		console.log(`Create ${JSON.stringify(todo)}`);
		this.todoService.create(todo, this.selectedQuadrant);
	}

	edit(todo: Todo) {
		console.log(`Edit ${JSON.stringify(todo)}`);
		this.editing = true;
		this.newTodo = todo;
	}

	update(todo: Todo) {
		console.log(`Update ${JSON.stringify(todo)}`);
		this.todoService.update(todo, this.selectedQuadrant);
		this.clearForm();
	}

	delete(todo: Todo, timescale: TodoTimescale) {
		console.log(`Delete ${JSON.stringify(todo)}`);
		this.todoService.delete(todo, timescale);
	}

	toggle(todo: Todo, timescale: TodoTimescale) {
		console.log(`Toggle ${JSON.stringify(todo)}`);
		this.todoService.toggle(todo, timescale);
	}

	/* utilities */

	clearForm(){
		this.newTodo = new Todo(0, "");
		this.selectedQuadrant = "MIT";
		this.editing = false;
	}

	get timescale (){
		return TodoTimescale;
	}
  
}
