import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Auth } from '../auth';
import { Login, Logout } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  public loggedIn;
  constructor(private store: Store,private router: Router) { 
    this.loggedIn = this.store.selectSnapshot(TwiteeState.isAuthenticated);

  }

  login(data: Auth) {
    this.store.dispatch(new Login(data)).subscribe(() =>{
      this.router.navigate([""]);
    })
  }
  

  ngOnInit(): void {
  }


}
