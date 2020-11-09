import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Auth } from '../auth';
import { Register } from '../state/twitee.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private store: Store, private router: Router ) { }
  
  register(data: Auth) {
    this.store.dispatch(new Register(data));
    this.router.navigate([""]);
  }
  
  ngOnInit(): void {
  }

}
