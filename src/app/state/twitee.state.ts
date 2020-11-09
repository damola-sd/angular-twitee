import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Twit } from '../twitee';
import { AddTwit, FetchTwits, RemoveTwit, Logout, Login, Register } from './twitee.actions';
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

    @Selector()
    static token(state: TwiteeStateModel) {
        return state.token
    }

    static isAuthenticated(state: TwiteeStateModel) {
        return state.loggedIn
    }


    @Action(Register)
    register({ patchState}: StateContext<TwiteeStateModel>, { payload }) {
        return this.authService.register(payload).pipe(tap((res) => {
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

    @Action(Logout)
    logout({ patchState }: StateContext<TwiteeStateModel>) {
        patchState({
            token: null,
            loggedIn: false
        })
    };

    @Action(FetchTwits)
    fetchTwits({ patchState}: StateContext<TwiteeStateModel>) {
        return this.twitService.getTwits().pipe(tap((res) => {
            patchState({
                twits: res.data,
            });
        }));
    }

    @Action(AddTwit)
    add({ getState, patchState }: StateContext<TwiteeStateModel>, { payload }: AddTwit) {
        return this.twitService.addTwit(payload).pipe(tap(() => {
            console.log('Added Twit')

        }));
    }

    @Action(RemoveTwit)
    remove({ getState, patchState }: StateContext<TwiteeStateModel>, { payload }: RemoveTwit) {
        return this.twitService.deleteTwit(payload).pipe(tap(() => {
            console.log('Trying to delete twit')

        }));
    }

    
}