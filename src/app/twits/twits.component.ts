import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FetchTwits } from '../state/twitee.actions';
import { TwiteeState } from '../state/twitee.state';
import { Twit } from '../twitee';
import { TwiteeServiceService } from '../twitee-service.service';


@Component({
  selector: 'app-twits',
  templateUrl: './twits.component.html',
  styleUrls: ['./twits.component.scss']
})
export class TwitsComponent implements OnInit {

  @Select(TwiteeState.getTwits) twits$: Observable<Twit[]>;

  constructor( private store: Store, private data: TwiteeServiceService) { 
    store.dispatch(new FetchTwits)
    this.twits$.subscribe(res => {
      console.log(res);
    })
  }
  // getTwits(): 

  ngOnInit(): void {
    // this.store.dispatch(new FetchTwits)
  //   this.data.getTwits().subscribe((res: any) => {
  //     console.log(res.data);
  //   })
  }

}
