import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Todo } from '../Todo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  itemDoc: AngularFirestoreDocument<Todo>;

  constructor(private angularFirestore: AngularFirestore) {}
  addTodo(todo: Todo) {
    todo.serialNo = this.angularFirestore.createId();
    return this.angularFirestore.collection('/sno').add(todo);
  }
  getAllTodos() {
    return this.angularFirestore
      .collection('sno')
      .snapshotChanges()
      .pipe(
        map((todos) => {
          return todos.map((todo) => {
            const data = todo.payload.doc.data() as Todo;
            const id = todo.payload.doc.id;
            // console.log(data);
            // console.log(id);
            return { ...data, id };
            
          });
        }),
      );
  }

  deleteTodo(todo: Todo) {
    this.itemDoc = this.angularFirestore.collection('/sno').doc(todo.id);
    console.log(todo.id);
    this.itemDoc.delete();
    console.log(this.itemDoc.ref);
  }

  toggleTodo(todo: Todo) {
    const serialNo = todo.serialNo;
    const snoRef = this.angularFirestore.collection('todos').doc(serialNo);
    return snoRef.update({ active: !todo.active });
  }
}
