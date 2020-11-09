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

  public tokenTest = '';
  public loggedIn;
  constructor(private store: Store,private router: Router) { 
  }

  login(data: Auth) {
    this.store.dispatch(new Login(data)).subscribe(() =>{
      this.tokenTest = this.store.selectSnapshot(TwiteeState.token);
      this.loggedIn = this.store.selectSnapshot(TwiteeState.isAuthenticated);
      this.router.navigate([""]);


    })
  }
  

  ngOnInit(): void {
  }


}
