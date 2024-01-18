export class HttpError {
    constructor(public status: number, public message: string) {}

    public isAuthenticationError(): boolean {
        return this.status === 401;
    }
}

