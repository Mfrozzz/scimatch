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
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentFbserviceService {
  
  private PATH: string = 'department';

  constructor(private afs:Firestore) { }

  readDepartments(): Observable<Department[]> {
    let dptoRef = collection(this.afs, this.PATH)
    return collectionData(dptoRef, {idField: 'id'}) as Observable<Department[]>
  }

  readDepartment(id:string):Observable<Department>{
    let dptoRef = doc(this.afs, this.PATH + '/' + id);
    return docData(dptoRef) as Observable<Department>
  }

  createDepartment(department: Department) {
    department.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), department)
  }
  
  async updateDepartment(department: Department) {
    let docRef = doc(this.afs, this.PATH + '/' + department.id)
    return await updateDoc(docRef, {
      idInstitute: department.idInstitute,
      name: department.name,
    })
    .catch(err => alert('Erro ao atualizar department!'));
  }

  async deletedepartment(department: Department) {
    let docRef = doc(this.afs, this.PATH + "/" + department.id)
    return await deleteDoc(docRef)
  }

}
