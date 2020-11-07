import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Auth } from '../auth';
import { Register } from '../state/twitee.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private store: Store) { }

  register(data: Auth) {
    this.store.dispatch(new Register(data))
  }
  
  ngOnInit(): void {
  }

}
