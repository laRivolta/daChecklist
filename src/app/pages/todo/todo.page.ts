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
		
		selectedQuadrant: string = "MIT";

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
			switch (this.selectedQuadrant) {
				case "MIT":
					this.todo.timescale = "MIT";
					this.mit.push(this.todo);
					break;
				case "Today":
				this.todo.timescale = "Today";
					this.today.push(this.todo);
					break;
				case "Later":
					this.todo.timescale = "Later";
					this.later.push(this.todo);
					break;
			}
			this.todo = new Todo(0, '');
		}

		/*private compareByKey(o1,o2){
			if(o1 == null || o2 == null){
				return false;
			}
			return o1 === o2.key;
		}*/
  
}
