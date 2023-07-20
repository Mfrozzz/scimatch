import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentFbserviceService {
  
  private PATH: string = 'department';

  constructor(private _angularFirestore: AngularFirestore, private _angularFireStorage: AngularFireStorage) { }

  createDepartment(department: Department){
    return this._angularFirestore.collection(this.PATH).add({
      idInstitute: department.idInstitute,
      name:department.name,

    });
  }

  updateDepartment(department:Department,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      idInstitute: department.idInstitute,
      name:department.name,

    });
  }

  getDepartment(id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getDepartments(){
    return this._angularFirestore.collection(this.PATH).snapshotChanges();
  }

  deleteDepartment(id:any){
    return this._angularFirestore.collection(this.PATH).doc(id).delete();
  }

}
