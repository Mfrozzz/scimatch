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
import { User } from 'firebase/auth';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectFBServiceService {

  private PATH: string = 'project';

  constructor(private afs:Firestore) { }

  readProjects(): Observable<Project[]> {
    let projRef = collection(this.afs, this.PATH)
    return collectionData(projRef, {idField: 'id'}) as Observable<Project[]>
  }

  readProject(id:string):Observable<Project>{
    let projRef = doc(this.afs, this.PATH + '/' + id);
    return docData(projRef) as Observable<Project>
  }

  createProject(project: Project) {
    project.id = doc(collection(this.afs, 'id')).id
    return addDoc(collection(this.afs, this.PATH), project)
  }
  
  async updateProject(project: Project) {
    let docRef = doc(this.afs, this.PATH + '/' + project.id)
    return await updateDoc(docRef, {
      idOwner: project.idOwner,
      name: project.name,
      description: project.description,
      type: project.type,
      docUrl: project.docURL
    })
    .catch(err => alert('Erro ao atualizar project!'));
  }

  async deleteProject(project: Project) {
    let docRef = doc(this.afs, this.PATH + "/" + project.id)
    return await deleteDoc(docRef)
  }

  /**
   * update
   * create
   * update aux
   * pro documento/url documento/ firebase
   */
}
