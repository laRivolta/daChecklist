import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import {
	CdkDragDrop, moveItemInArray, transferArrayItem
  } from '@angular/cdk/drag-drop';

import { Todo, TodoUtils, TodoTimescale } from './models/todo.model';
import { TodoService } from '../../../services/todo.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
	selector: 'app-todo',
	templateUrl: 'todo.page.html',
	styleUrls: ['todo.page.scss'],
	providers: [ TodoService ]
})
export class TodoPage implements OnInit, DoCheck {

	public loading: HTMLIonLoadingElement;
	
	aPriority1: Array<Todo> = new Array();
	aPriority2: Array<Todo> = new Array();
		
	selectedQuadrant: string = "Today";

	newTodo: Todo = new Todo(0,'');
	currentTodo: Todo;
	snapshot: Todo;
	 
	constructor(
		private todoService: TodoService, 
		public loadingCtrl: LoadingController,
      	public alertCtrl: AlertController,
		private navCtrl: NavController,
		private authService: AuthenticationService
		) {}

	ngOnInit() {
		this.aPriority1 = this.todoService.findAllPriority1();
		this.aPriority2 = this.todoService.findAllPriority2();
	}

	ngDoCheck() {
		this.aPriority1 = this.todoService.findAllPriority1();
		this.aPriority2 = this.todoService.findAllPriority2();
	}

	drop(event: CdkDragDrop<Array<Todo>>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
							event.container.data,
							event.previousIndex,
							event.currentIndex);
		}
		this.todoService.save();
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

	async logout() {
		
		this.loading = await this.loadingCtrl.create();
      	await this.loading.present();

		this.authService.logoutUser().then(
			() => {
				this.loading.dismiss().then(() => {
					this.navCtrl.navigateRoot('/home');
				});
			  },
			  error => {
				this.loading.dismiss().then(async () => {
				  const alert = await this.alertCtrl.create({
					message: error.message,
					buttons: [{ text: 'Ok', role: 'cancel' }],
				  });
				  await alert.present();
				});
			  }
		);
	}

	/* utilities */

	clearForm(){
		this.newTodo = new Todo(0, "");
		this.selectedQuadrant = "Today";
		this.currentTodo = null;
		this.snapshot = null;
	}

	get timescale (){
		return TodoTimescale;
	}
  
}
