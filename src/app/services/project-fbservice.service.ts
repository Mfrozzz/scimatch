import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { User } from 'firebase/auth';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectFBServiceService {

  private PATH: string = 'project';

  constructor(private _angularFirestore: AngularFirestore, private _angularFireStorage: AngularFireStorage
    ,private  authn:AngularFireAuth/*,private _auth: Auth*/) { }

  createProject(project: Project){
    return this._angularFirestore.collection(this.PATH).add({
      idOwner:project.idOwner,
      name:project.name,
      description:project.description,
      type:project.type,
      docURL:project.docURL
    });
  }

  updateProject(project:Project,id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).update({
      //idOwner:project.idOwner,
      name:project.name,
      /*institute:project.institute,
      department:project.department,*/
      description:project.description,
      type:project.type,
    });
  }

  getProject(id:string){
    return this._angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getProjects(){
    return this._angularFirestore.collection(this.PATH).snapshotChanges();
  }

  deleteProject(id:any){
    return this._angularFirestore.collection(this.PATH).doc(id).delete();
  }

  /**
   * update
   * create
   * update aux
   * pro documento/url documento/ firebase
   */
}
