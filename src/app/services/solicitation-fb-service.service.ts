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
import { Solicitation } from '../models/solicitation';


@Injectable({
  providedIn: 'root'
})
export class SolicitationFbServiceService {

  private PATH: string = 'solicitation';

  constructor(private afs:Firestore) { }

  readSolicitations(): Observable<Solicitation[]> {
    let projRef = collection(this.afs, this.PATH)
    return collectionData(projRef, {idField: 'id'}) as Observable<Solicitation[]>
  }

  createSolicitation(solicitation: Solicitation) {
    solicitation.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), solicitation)
  }

  async deleteSolicitation(id: string) {
    let docRef = doc(this.afs, this.PATH + "/" + id)
    return await deleteDoc(docRef)
  }
}
