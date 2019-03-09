import { Component, DoCheck, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';

import { Todo, TodoUtils, TodoTimescale } from './models/todo.model';
import { TodoService } from '../../services/todo.service';
import { AuthenticationService } from './../../services/authentication.service';

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
	currentTodo: Todo;
	snapshot: Todo;
	 
	constructor(private todoService: TodoService, private dragulaService: DragulaService, 
		private toastController: ToastController, private authService: AuthenticationService) {

		this.dragulaService.drag('bag')
			.subscribe(({ name, el, source }) => {
				
			});
	
		this.dragulaService.removeModel('bag')
			.subscribe(({ item }) => {
				//this.delete(item, 0);
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
		this.create(this.newTodo);
		this.clearForm();
	}

	private create(todo: Todo) {
		this.todoService.create(todo, this.selectedQuadrant);
	}

	edit(todo: Todo) {
		this.currentTodo = todo;
		this.snapshot = TodoUtils.copy(todo);
	}

	cancelEdit() {
		TodoUtils.copyProperties(this.snapshot, this.currentTodo);
		this.clearForm();
	}

	update(todo: Todo, timescale: TodoTimescale) {
		this.todoService.update(todo, timescale);
		this.clearForm();
	}

	delete(todo: Todo, timescale: TodoTimescale) {
		this.todoService.delete(todo, timescale);
		this.clearForm();
	}

	toggle(todo: Todo, timescale: TodoTimescale) {
		this.todoService.toggle(todo, timescale);
		this.clearForm();
	}

	logout() {
		this.authService.logout();
	}

	/* utilities */

	clearForm(){
		this.newTodo = new Todo(0, "");
		this.selectedQuadrant = "MIT";
		this.currentTodo = null;
		this.snapshot = null;
	}

	get timescale (){
		return TodoTimescale;
	}
  
}
