import { Twit } from '../twitee';
import { Auth } from '../auth';


export class FetchTwits {
    static readonly type = '[TWIT] Fetch'
}

export class AddTwit {
    static readonly type = '[TWIT] Add'

    constructor(public payload: Twit) {}
}

export class RemoveTwit {
    static readonly type = '[TWIT] Remove'

    constructor(public payload: Twit) {}
}

export class Register {
    static readonly type = '[Auth] Register'

    constructor(public payload: Auth) {}
}

export class Login {
    static readonly type = '[Auth] Login'

    constructor(public payload: Auth) {}
}

