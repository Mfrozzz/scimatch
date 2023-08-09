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
import { Institute } from '../models/institute';

@Injectable({
  providedIn: 'root'
})
export class InstituteFbserviceService {

  private PATH: string = 'institute';

  constructor(private afs:Firestore){

  }

  readInstitutes(): Observable<Institute[]> {
    let instRef = collection(this.afs, this.PATH)
    return collectionData(instRef, {idField: 'id'}) as Observable<Institute[]>
  }

  readInstitute(id:string):Observable<Institute>{
    let instRef = doc(this.afs, this.PATH + '/' + id);
    return docData(instRef) as Observable<Institute>
  }

  createInstitute(institute: Institute) {
    institute.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), institute)
  }

  
  async updateinstitute(institute: Institute) {
    let docRef = doc(this.afs, this.PATH + '/' + institute.id)
    return await updateDoc(docRef, {
        name: institute.name,
        email: institute.email,
    })
    .catch(err => alert('Erro ao atualizar institute!'));
  }

  async deleteinstitute(institute: Institute) {
    let docRef = doc(this.afs, this.PATH + "/" + institute.id)
    return await deleteDoc(docRef)
  }
}
