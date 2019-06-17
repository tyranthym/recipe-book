export class User {
    // tslint:disable-next-line: variable-name
    constructor(public email: string, public id: string, private _idToken: string, private _tokenExpirationDate: Date) { }

    get idToken() {
        // check expiration date here
        if (!this._tokenExpirationDate || new Date() >= this._tokenExpirationDate) {
            return null;
        }
        return this._idToken;
    }

    // in milli-second
    get tokenExpiresIn() {
        const now = new Date().getTime();
        const expirationDate = this._tokenExpirationDate.getTime();
        const diff = expirationDate - now;
        if (diff <= 0) {
            return null;
        }
        return diff;
    }
}
