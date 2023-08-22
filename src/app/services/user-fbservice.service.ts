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
  collectionData
} from '@angular/fire/firestore'
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserFBServiceService {
  private PATH: string = 'user';
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(private afs:Firestore,private _auth: Auth) { }

  readUsers(): Observable<User[]> {
    let userRef = collection(this.afs, this.PATH)
    return collectionData(userRef, {idField: 'id'}) as Observable<User[]>
  }

  readUser(id:string):Observable<User>{
    let userRef = doc(this.afs, this.PATH + '/' + id);
    return docData(userRef) as Observable<User>
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
  
  async registerFB(sUser:User){
    this.auth = getAuth()
    await createUserWithEmailAndPassword(this._auth,sUser.email,sUser.password).then(()=>{
      let usuario = {
        id:'',
        email:sUser.email,
        name:sUser.name,
        academicRegister:sUser.academicRegister,
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/scimatch-a3481.appspot.com/o/defaultPhoto%2Fimages.png?alt=media&token=b410032f-4f98-4fbc-98dd-927b2a1b6c33'
      }
      this.createUser(usuario)
      .then(() => {alert("funcionário cadastrado com sucesso!")})
      .catch((error) => {
        console.log('testes')
        alert("Ocorreu um erro durante o cadastro, tente novamente!")
        return error
      })
    })
    .catch((error) => {
      console.log('vixi')
      alert("Ocorreu um erro durante o cadastro, tente novamente! " + error)
      return error
    })
  }

  createUser(user: any) {
    user.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), user)
  }
  /*
      id:string;
    email:string;
    password:string;
    name:string;
    academicRegister:string;
    institute:Institute;
    department:Department;
    city:string;
    photoURL:any;
  createUser(conta: Funcionario, senha: string) {
    this.authentication()

    createUserWithEmailAndPassword(this.auth, conta.email, senha)
    .then(() => {
      let funcionario = {id: '', nome: conta.nome, telefone: conta.telefone, email: conta.email, admin: conta.admin}

      this.funcionarioFs.createFuncionario(funcionario)
      .then(() => {alert("funcionário cadastrado com sucesso!")})
      .catch((error) => {
        console.log('testes')
        alert("Ocorreu um erro durante o cadastro, tente novamente!")
        return error
      })
    })
    .catch((error) => {
      console.log('vixi')
      alert("Ocorreu um erro durante o cadastro, tente novamente! " + error)
      return error
    })
  }
  */
    /**
     * login
     * logout
     * recover password
     */
}
