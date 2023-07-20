import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Institute } from '../models/institute';

@Injectable({
  providedIn: 'root'
})
export class InstituteFbserviceService {

  private PATH: string = 'institute';

  constructor(private _angularFirestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  createInstitute(institute: Institute){
    return this._angularFirestore.collection(this.PATH).add({
      name:institute.name,
      socialMedias:institute.email,
    });
  }

  updateInstitute(institute:Institute,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      name:institute.name,
      socialMedias:institute.email,
    });
  }

  getInstitute(id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getInstitutes(){
    return this._angularFirestore.collection(this.PATH).snapshotChanges();
  }

  deleteInstitute(id:any){
    return this._angularFirestore.collection(this.PATH).doc(id).delete();
  }
}
