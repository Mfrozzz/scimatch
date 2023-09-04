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
  DocumentReference,
  limit
} from '@angular/fire/firestore'
import { User } from '../models/user';
import { Project } from '../models/project';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';


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

  async getProjById(idOwner: any): Promise<Project[] | null> {
    const q = query(collection(this.afs, this.PATH), where('idOwner.id', '==', idOwner));

    const querySnapshot = await getDocs(q);
    let projects:Project[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((projectsSnapShot)=>{
        projects.push(projectsSnapShot.data() as Project)
      })
      return projects;
    } else {
      return null;
    }
  }

  async getProjByIdReverse(idOwner: any): Promise<Project[] | null> {
    const q = query(collection(this.afs, this.PATH), where('idOwner.id', '!=', idOwner));

    const querySnapshot = await getDocs(q);
    let projects:Project[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((projectsSnapShot)=>{
        projects.push(projectsSnapShot.data() as Project)
      })
      return projects;
    } else {
      return null;
    }
  }

  async getProjByIdUni(instituteName: any,userID:any): Promise<Project[] | null> {
    const q = query(collection(this.afs, this.PATH), where('instituteId', '==', instituteName));

    const querySnapshot = await getDocs(q);
    let projects:Project[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.forEach((projectsSnapShot)=>{
        projects.push(projectsSnapShot.data() as Project)
      })
      return projects;
    } else {
      return null;
    }
  }

  async getProjByName(title: any){
    const q = query(collection(this.afs, this.PATH), where('name', '==', title))
    let project: any[] = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      project.push(doc.data() as Observable<Project[]>)
    });

    return project as Project[]
  }
  

  async getProjByVddID(id: string): Promise<Project | null> {
    const q = query(collection(this.afs, this.PATH), where('id', '==', id), limit(1));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userSnapshot = querySnapshot.docs[0];
      return userSnapshot.data() as Project;
    } else {
      return null;
    }
  }

  readProject(id:string):Observable<Project>{
    let projRef = doc(this.afs, this.PATH + '/' + id);
    return docData(projRef) as Observable<Project>
  }

  async updateProjID(id:any){
    let docRef = doc(this.afs, this.PATH + '/' + id);
    return updateDoc(docRef,{
      id: id
    })
  }

  async createProjectMaster(sProj:Project,usuario:User){
    let project = {
      id:'',
      idOwner:usuario,
      name: sProj.name,
      description:sProj.description,
      type:sProj.type,
      instituteId:usuario.institute.name,
      members:sProj.members,
      docURL:sProj.docURL
    }
    project = project as Project
    await this.createProject(project).then((document: DocumentReference) => {
        //usuario.id = document.id
        console.log(document.id)
        this.updateProjID(document.id)
        alert("projeto cadastrado com sucesso!");
        //this._router.navigate(['/login']);
      })
      .catch((error) => {
        alert("Ocorreu um erro durante o cadastro, tente novamente!")
        console.log(error)
        return error
      })
      
  }

  async createProject(project: Project) {
    return addDoc(collection(this.afs, this.PATH), project)
  }
  
  async updateProject(project: any,id:string) {
    let docRef = doc(this.afs, this.PATH + '/' + id)
    return await updateDoc(docRef, {
      name: project.name,
      description: project.description,
      type: project.type,
      members:project.members,
      //docUrl: project.docURL
    })
    .catch(err => alert('Erro ao atualizar project! '+err));
  }
  async updateProjectCImagem(project: any,id:string) {
    let docRef = doc(this.afs, this.PATH + '/' + id)
    return await updateDoc(docRef, {
      name: project.name,
      description: project.description,
      type: project.type,
      members:project.members,
      docUrl: project.docURL
    })
    .catch(err => alert('Erro ao atualizar project! '+err));
  }

  async deleteProject(project: Project) {
    let docRef = doc(this.afs, this.PATH + "/" + project.id)
    return await deleteDoc(docRef)
  }

  enviarProject(imagem: any, project: any,usuario:any) {
    const storage = getStorage()
    const path = `projetos/${new Date().getTime()}_${imagem.name}`
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, imagem);
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
          project.docURL = downloadURL;
          this.createProjectMaster(project,usuario)
        });
      })
  }

  updateProj(imagem: any, project: any,id:string) {
    const storage = getStorage();
    // Envio da imagem
    const path = `projetos/${new Date().getTime()}_${imagem.name}`
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, imagem);
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
          project.docURL = downloadURL;
          this.updateProjectCImagem(project,id)
        });
      })
  }
  /**
   * update
   */
}
