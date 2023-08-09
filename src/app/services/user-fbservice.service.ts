import { Injectable,inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  doc,
  query,
  where,
  addDoc,
  getDocs,
  docData,
  updateDoc,
  deleteDoc,
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserFBServiceService {
  private PATH: string = 'user';

  constructor(private afs:Firestore) { }

  readUsers(): Observable<User[]> {
    let userRef = collection(this.afs, this.PATH)
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]>
  }

  readUser(id:string):Observable<User>{
    let userRef = doc(this.afs, this.PATH + '/' + id);
    return docData(userRef) as Observable<User>
  }

  createUser(user: User) {
    user.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), user)
  }
  
  async updateUser(user: User) {
    let docRef = doc(this.afs, this.PATH + '/' + user.id)
    return await updateDoc(docRef, {
      email: user.email,
      password: user.password,
      name: user.name,
      academinRegister: user.academicRegister,
      institute: user.institute,
      department: user.department,
      city: user.city,
      photoURL: user.photoURL
    })
    .catch(err => alert('Erro ao atualizar user!'));
  }

  async deleteUser(user: User) {
    let docRef = doc(this.afs, this.PATH + "/" + user.id)
    return await deleteDoc(docRef)
  }

    /**
     * login
     * logout
     * recover password
     */
}
