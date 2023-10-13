/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  todoObj : Todo = {
    id: '',
    serialNo: '',
    title: '',
    description: '',
    active: false
  };
  serialNo: string;
  title: string;
  description: string;
  active: boolean;

  constructor(private data: CrudService) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  resetForm() {
    this.serialNo = '';
    this.title = '';
    this.description = '';
  }

  getAllTodos() {
    this.data.getAllTodos()
    .subscribe({
      next: (res) => {
        this.todos = res.map((e: any) => {
          // const data = e?.payload?.doc?.data();
          return e;
        })
      },
      error: (err) => {
        alert(err);
      }
    })
  }


  addTodo() {
    if(this.title == '' || this.description == ''){
      alert("Fill all input fields");
      return;
    }
    this.todoObj.serialNo = this.serialNo;
    this.todoObj.title = this.title;
    this.todoObj.description = this.description;

    this.data.addTodo(this.todoObj); 
    this.resetForm();
  }

  deleteTodos(todo : Todo) {
    if (window.confirm('are you sure you want to delete')) {
      // console.log(todo.title);
      this.data.deleteTodo(todo);
    }
  }

  toggleTodos(todo : Todo) {
    this.data.toggleTodo(todo);
  }
}
