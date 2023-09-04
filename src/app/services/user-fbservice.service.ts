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
  limit,
  DocumentReference
} from '@angular/fire/firestore'
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Storage, StorageModule, deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class UserFBServiceService {
  private PATH: string = 'user';
  auth = getAuth();
  user = this.auth.currentUser;

  constructor(private afs:Firestore,private _auth: Auth,private _router : Router,
    private fBstorage: Storage) {
     }

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

  async getUserByVddID(id: string): Promise<User | null> {
    const q = query(collection(this.afs, this.PATH), where('id', '==', id), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0];
      return userSnapshot.data() as User;
    } else {
      return null;
    }
  }

  async updateUserID(id:any){
    let docRef = doc(this.afs, this.PATH + '/' + id);
    return await updateDoc(docRef,{
      id: id
    })
  }
  
  async updateUser(user: any) {
    console.log(user.id)

    //let userRef = doc(this.afs, this.PATH + '/' + id);


    let docRef = doc(this.afs, this.PATH + '/' + user.id)
    return await updateDoc(docRef, {
      name: user.name,
      academicRegister: user.academicRegister,
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
    const ususario = await createUserWithEmailAndPassword(this._auth,sUser.email,sUser.password)
    //const idUuid = ususario.user?.uid as string
    let usuario = {
      id:'',
      email:sUser.email,
      name:sUser.name,
      academicRegister:sUser.academicRegister,
      photoURL: 'https://firebasestorage.googleapis.com/v0/b/scimatch-a3481.appspot.com/o/defaultPhoto%2Fimages.png?alt=media&token=1870a793-b139-4149-addb-db368ce46ecd',
      admin: false
    }
    this.createUser(usuario as User)
      .then((document: DocumentReference) => {
        //usuario.id = document.id
        this.updateUserID(document.id)
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

  updateImg(imagem: any, usuario: any) {
    /*const storage = getStorage();

    const firePath = 'https://firebasestorage.googleapis.com/v0/b/scimatch-a3481.appspot.com/o/';
    const link = usuario.photoURL;
    let imagePath:string = link.replace(firePath,"");
    const indexOfEndPath = imagePath.indexOf("?");
    imagePath = imagePath.substring(0, indexOfEndPath);
    imagePath = imagePath.replace("%2F","/");
    const imageRef = ref(storage, imagePath);
    deleteObject(imageRef).catch((err) => {alert(err);})*/
    // Envio da imagem
    const path = `imagens/${new Date().getTime()}_${imagem.name}`
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(this.fBstorage, path);
    const uploadTask = uploadBytesResumable(storageRef, imagem);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            alert("Você não possui permissão para isso!")
            break;
          case 'storage/canceled':
            alert('Download cancelado!')
            break;
          case 'storage/unknown':
            alert('Um erro inesperado aconteceu!')
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          usuario.photoURL = downloadURL;
          this.updateUser(usuario)
        });
      })
  }

  async createUser(user: User) {
    //user.id = doc(collection(this.afs,'')).id
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
     * recover password
     */
}
