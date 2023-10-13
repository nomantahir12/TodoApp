import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Todo } from '../Todo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {

  itemDoc: AngularFirestoreDocument<Todo>;


  constructor(private afs: AngularFirestore) {}
  addTodo(todo: Todo) {
    todo.sno = this.afs.createId();
    return this.afs.collection('/sno').add(todo);
  }
  getAllTodos() {
    return this.afs.collection('sno').snapshotChanges().pipe(
      map(todos => {
        return todos.map(todo => {
          const data = todo.payload.doc.data() as Todo;
          const id = todo.payload.doc.id;
          return { ...data, id  };
        });
      })
    );
  }
  
 
  deleteTodo(todo: Todo) {
    this.itemDoc = this.afs.collection('/sno').doc(todo.sno);
    this.itemDoc.delete();
    console.log(this.itemDoc.ref);
  }
  
  

  toggleTodo(todo: Todo) {
    const sno = todo.sno;
    const snoRef = this.afs.collection('todos').doc(sno);
    return snoRef.update({ active: !todo.active });
  }
}

