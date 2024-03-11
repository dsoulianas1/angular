import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;

  constructor(private _http:HttpClient, private _router:Router){}
  
  ngOnInit(): void {
    this.login = new FormGroup({
      'fname': new FormControl(),
      'password': new FormControl()
    });
  }
  logindata(login:FormGroup){
    //console.log(this.login.value);
    this._http.get<any>("http://localhost:3000/singup")
    .subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.fname === this.login.value.fname && a.password === this.login.value.password
    });
    if(user){
      alert('you are successfully login');
      this.login.reset();
      this._router.navigate(['dashboard']);
    }else{
      alert('user not found');
      this._router.navigate(['login']);
    }

      }, err=>{
        alert('something was wrong');
      })
    }
    
  }