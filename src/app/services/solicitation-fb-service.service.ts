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

  updateSolID(id:any){
    let docRef = doc(this.afs, this.PATH + '/' + id);
    return updateDoc(docRef,{
      id: id
    })
  }

  createSolicitationMaster(sSolicitation: Solicitation, owner:any){
    let solicitacao = {
      id:'',
      idUser:owner,
      title: sSolicitation.title,
      description:sSolicitation.description
    }
    this.createSolicitation(solicitacao as Solicitation)
    .then((document: DocumentReference) => {
      //usuario.id = document.id
      this.updateSolID(document.id)
      alert("solicitação enviada com sucesso!");
      alert("Assim que sua solicitação for atendida, nossa equipe entrará em contado via email. Atenciosamente: equipe SciMatch.")
      //this._router.navigate(['/login']);
    })
    .catch((error) => {
      alert("Ocorreu um erro durante a solicitação, tente novamente!")
      return error
    }).catch((error) => {
      alert("Ocorreu um erro durante a solicitação, tente novamente! " + error)
      return error
  })
  }

  createSolicitation(solicitation: Solicitation) {
    //solicitation.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), solicitation)
  }

  async deleteSolicitation(id: string) {
    let docRef = doc(this.afs, this.PATH + "/" + id)
    return await deleteDoc(docRef)
  }
}
