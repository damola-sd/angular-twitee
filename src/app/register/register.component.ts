import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from '../auth';
import { Register } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loggedIn;
  registerForm:  FormGroup;
  submitted = false;

  constructor(private store: Store, private router: Router, private formBuilder: FormBuilder) {
    this.loggedIn = this.store.selectSnapshot(TwiteeState.isAuthenticated);
  }

  register(data: Auth) {
    this.store.dispatch(new Register(data)).subscribe(() => {
      this.router.navigate([""]);

    })
  }



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }) 
  }
   get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        this.register(this.registerForm.value);
        this.submitted = false;
        this.registerForm.reset();
    }


}
