import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { PipesModule } from '../../pipes.module';

import { TodoPage } from './todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoPage
      }
    ]),
    DragDropModule,
    PipesModule
  ],
  declarations: [TodoPage]
})
export class TodoPageModule {}
