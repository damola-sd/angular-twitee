import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Auth } from '../auth';
import { Login, Logout } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public loggedIn;
  loginForm:  FormGroup;
  submitted = false;

  constructor(private store: Store,private router: Router, private formBuilder: FormBuilder) { 
    this.loggedIn = this.store.selectSnapshot(TwiteeState.isAuthenticated);

  }

  login(data: Auth) {
    this.store.dispatch(new Login(data)).subscribe(() =>{
      this.router.navigate([""]);
    })
  }
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }) 
  }
   get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // display form values on success
        this.login(this.loginForm.value);
        this.submitted = false;
        this.loginForm.reset();
    }
  


}
