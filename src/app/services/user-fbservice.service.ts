import { Injectable,inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from 'firebase/auth';
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
  collectionData,
  limit
} from '@angular/fire/firestore'
import { User } from '../models/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserFBServiceService {
  private PATH: string = 'user';
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(private afs:Firestore,private _auth: Auth,private _router : Router) { }

  readUsers(): Observable<User[]> {
    let userRef = collection(this.afs, this.PATH)
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]>
  }

  readUser(id:string):Observable<User>{
    let userRef = doc(this.afs, this.PATH + '/' + id);
    return docData(userRef) as Observable<User>
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(this.afs, this.PATH), where('email', '==', email), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0];
      return userSnapshot.data() as User;
    } else {
      return null;
    }
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
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    })
    .catch(err => alert('Erro ao atualizar user!'));
  }

  async deleteUser(user: User) {
    let docRef = doc(this.afs, this.PATH + "/" + user.id)
    return await deleteDoc(docRef)
  }
  
  async registerFB(sUser:User){
    this.auth = getAuth()
    const ususario = await createUserWithEmailAndPassword(this._auth,sUser.email,sUser.password);
    const idUuid = ususario.user?.uid as string
    let usuario = {
      id:idUuid,
      email:sUser.email,
      name:sUser.name,
      academicRegister:sUser.academicRegister,
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/scimatch-a3481.appspot.com/o/defaultPhoto%2Fimages.png?alt=media&token=b410032f-4f98-4fbc-98dd-927b2a1b6c33',
      admin: false
    }
    this.createUser(usuario as User)
      .then(() => {
        alert("usuário cadastrado com sucesso!");
        this._router.navigate(['/login']);
      })
      .catch((error) => {
        alert("Ocorreu um erro durante o cadastro, tente novamente!")
        return error
      }).catch((error) => {
        alert("Ocorreu um erro durante o cadastro, tente novamente! " + error)
        return error
    })
  }

  async createUser(user: User) {
    doc(collection(this.afs,user.id)).id
    return addDoc(collection(this.afs, this.PATH), user)
    /*user.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), user)*/
  }

  async loginFB(email:any,senha:any){
    this.auth = getAuth();
    return signInWithEmailAndPassword(this.auth,email,senha)
  }

  logout(){
    return signOut(this._auth);
  }

  usuarioLogged(){//gambiarra
    this.auth = getAuth();
    return this.auth.currentUser;
  }
    /**
     * login
     * logout
     * recover password
     */
}
