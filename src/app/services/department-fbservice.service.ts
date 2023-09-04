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
  collectionData,
  DocumentReference
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

  createDepartmentMaster(sDepartment: any){
    let department = {
      id:'',
      name:sDepartment.name,
      idIntitute:sDepartment.idInstitute
    }
    this.createDepartment(department as unknown as Department)
      .then((document: DocumentReference) => {
        //usuario.id = document.id
        this.updateDptoID(document.id)
        alert("Departamento cadastrado com sucesso!");
        //this._router.navigate(['/login']);
      })
      .catch((error) => {
        alert("Ocorreu um erro durante o cadastro, tente novamente!")
        return error
      }).catch((error) => {
        alert("Ocorreu um erro durante o cadastro, tente novamente! " + error)
        return error
    })
  }

  async updateDptoID(id:any){
    let docRef = doc(this.afs, this.PATH + '/' + id);
    return await updateDoc(docRef,{
      id: id
    })
  }

  createDepartment(department: Department) {
    //department.id = doc(collection(this.afs, 'id')).id
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
