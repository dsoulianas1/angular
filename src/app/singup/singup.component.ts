import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  constructor(
    private _router:Router,
    private _http:HttpClient,
    private _toast:ToastrService
    ){}
singup:FormGroup|any;
signuser:any;
  ngOnInit(): void {
    this.singup = new FormGroup({
      'fname':new FormControl(),
      'lname':new FormControl(),
      'email':new FormControl(),
      'phone':new FormControl(),
      'password':new FormControl(),
    })
  }
  singupdata(singup:FormGroup){
    this.signuser = this.singup.value.fname;
    this._http.post<any>("http://localhost:3000/singup", this.singup.value)
    .subscribe(res=>{
      this._toast.success(this.signuser, 'you are successfully singup');
      this.singup.reset();
      this._router.navigate(['login']);
    },err=>{
      alert('something went wrong');
    })
  }

}
