import { Injectable } from '@angular/core';
import { finalize, takeLast } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class UserFBServiceService {
  private PATH: string = 'user';

  constructor(private _angularFirestore: AngularFirestore, private _angularFireStorage: AngularFireStorage
    ,private  authn:AngularFireAuth/*,private _auth: Auth*/) { }

  async createUser(user: User){
    //com login e tal pelo Auth
  }

  updateUser(user:User,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      email:user.email,
      password:user.password,
      name:user.name,
      academicRegister:user.academicRegister,
      institute:user.institute,
      department:user.department,
      city:user.city,
    });
  }

  getUser(id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getUsers(){
    return this._angularFirestore.collection(this.PATH).snapshotChanges();
  }

  deleteUser(id:any){
    return this._angularFirestore.collection(this.PATH).doc(id).delete();
  }

    /**
   * update
   * create
   * update aux
   * pra foto/url foto/ firebase
   */

    /**
     * login
     * logout
     * recover password
     */
}
