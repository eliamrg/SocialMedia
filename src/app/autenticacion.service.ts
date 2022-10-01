import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private aufauth: AngularFireAuth) { }

  async registro(email:string,contrasena:string){
    try{
      return await this.aufauth.createUserWithEmailAndPassword(email.trim(),contrasena.trim());
    }catch(err){
      console.log("error crear usuario",err)
      return null;
    }
  }
  async login(email:string,contrasena:string){
    try{
      return await this.aufauth.signInWithEmailAndPassword(email,contrasena);
    }catch(err){
      console.log("error login",err)
      return null;
    }
  }

  async loginGoogle(email:string,contrasena:string){
    try{
      return await this.aufauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }catch(err){
      console.log("error login google",err)
      return null;
    }
  }

  getUserLogged(){
    
    return this.aufauth.authState;
    
  }
  getUserId(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      return uid;
    }
    else{
      return null;
    }
  }
  getUserName(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.displayName;
      return uid;
    }
    else{
      return null;
    }
  }
  getUserPic(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.photoURL;
      return uid;
    }
    else{
      return null;
    }
  }
  

  logOut(){
    this.aufauth.signOut();
  }
}