import { Component, DoCheck } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { DragulaService } from 'ng2-dragula';

import { Todo, TodoUtils, TodoTimescale } from './models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
	selector: 'app-todo',
	templateUrl: 'todo.page.html',
	styleUrls: ['todo.page.scss'],
	providers: [ TodoService ]
})
export class TodoPage implements DoCheck {
	
	aMit: Array<Todo> = new Array();
	aToday: Array<Todo> = new Array();
	aLater: Array<Todo> = new Array();
		
	selectedQuadrant: string = "MIT";

	newTodo: Todo = new Todo(0,'');
	snapshot: Todo = new Todo(0,'');
	 
	constructor(private todoService: TodoService/*, private dragulaService: DragulaService*/, private toastController: ToastController) {

		/*this.dragulaService.drag('bag')
			.subscribe(({ name, el, source }) => {
				
			});
	
		this.dragulaService.removeModel('bag')
			.subscribe(({ item }) => {
				this.toastController.create({
					message: 'Removed: ' + item.value,
					duration: 2000
					}).then(toast => toast.present());
			});
	
		this.dragulaService.dropModel('bag')
			.subscribe(({ item }) => {
		});
	
		this.dragulaService.createGroup('bag', {
			removeOnSpill: true
		});*/
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
		console.log(`Create ${JSON.stringify(todo)}`);
		this.todoService.create(todo, this.selectedQuadrant);
		this.newTodo = new Todo(0, '');
	}

	edit(todo: Todo) {
		console.log(`Edit ${JSON.stringify(todo)}`);
		this.newTodo = todo;
		this.snapshot = TodoUtils.copy(todo);
	}

	cancelEdit() {
		TodoUtils.copyProperties(this.snapshot, this.newTodo);
		this.newTodo = null;
		this.snapshot = null;
	}

	update(todo: Todo) {
		console.log(`Delete ${JSON.stringify(todo)}`);
		this.newTodo = null;
		this.snapshot = null;
		this.todoService.update(todo);
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
		this.newTodo = new Todo(0, '');
		this.selectedQuadrant = "MIT";
	}

	get timescale (){
		return TodoTimescale;
	}
  
}
