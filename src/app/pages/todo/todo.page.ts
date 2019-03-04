import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DragulaService } from 'ng2-dragula';

import { Todo, TodoTimescale } from './models/todo.model';
import { TodoService } from '../../services/todo.service';
import { KeysPipe } from '../../pipes/keys.pipe';

@Component({
	selector: 'app-todo',
	templateUrl: 'todo.page.html',
	styleUrls: ['todo.page.scss'],
	providers: [ TodoService ]
})
export class TodoPage {
  
  	mit: Array<Todo> = new Array();
	  today: Array<Todo> = new Array();
		later: Array<Todo> = new Array();
		
		selectedQuadrant: TodoTimescale = TodoTimescale.MIT;

	  todo: Todo = new Todo(0,'');
		timescales = TodoTimescale;
	 
	  constructor(private dragulaService: DragulaService, private toastController: ToastController) {

			this.dragulaService.drag('bag')
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
			});
	  }
	 
	  addTodo() {
			console.log(this.selectedQuadrant);
			switch (this.selectedQuadrant) {
				case TodoTimescale.MIT:
					this.todo.timescale = TodoTimescale.MIT;
					this.mit.push(this.todo);
					break;
				case TodoTimescale.Today:
					this.todo.timescale = TodoTimescale.Today;
					this.today.push(this.todo);
					break;
				case TodoTimescale.Later:
					this.todo.timescale = TodoTimescale.Later;
					this.later.push(this.todo);
					break;
			}
			this.todo = new Todo(0, '');
		}

		private compareByKey(o1,o2){
			if(o1 == null || o2 == null){
				return false;
			}
			return o1.key === o2;
		}
  
}
