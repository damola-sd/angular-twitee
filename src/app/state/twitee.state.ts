import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Twit } from '../twitee';
import { AddTwit, FetchTwits, RemoveTwit, Login, Register } from './twitee.actions';
import { TwiteeServiceService } from '../twitee-service.service';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export class TwiteeStateModel {
    twits: Twit[];
    token: string;
    loggedIn: boolean
}

@State<TwiteeStateModel>({
    name: 'twits',
    defaults: {
        twits: [],
        token: '',
        loggedIn: false
    }
})

@Injectable() 
export class TwiteeState {

    constructor(private twitService: TwiteeServiceService, private authService: AuthService) {
    }

    @Selector()
    static getTwits(state: TwiteeStateModel) {
        return state.twits
    }

    @Action(Register)
    register({ patchState}: StateContext<TwiteeStateModel>, { payload }) {
        return this.authService.register(payload).pipe(tap((res) => {
            console.log(res);
            patchState({
                token: res.token,
                loggedIn: true
            })
        }))
    };

    @Action(Login)
    login({ patchState}: StateContext<TwiteeStateModel>, { payload }) {
        return this.authService.login(payload).pipe(tap((res) => {
            patchState({
                token: res.data.token,
                loggedIn: true
            })
        }))
    };

    @Action(FetchTwits)
    fetchTwits({ patchState}: StateContext<TwiteeStateModel>) {
        return this.twitService.getTwits().pipe(tap((res) => {
            console.log(res)
            // const state = getState();
            patchState({
                twits: res.data,
            });
        }));
    }

    @Action(AddTwit)
    add({ getState, patchState }: StateContext<TwiteeStateModel>, { payload }: AddTwit) {
        const state = getState();
        patchState({ 
            twits: [ ...state.twits, payload]
        })
    }
}