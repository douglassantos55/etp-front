import { getContext, setContext } from "svelte";
import { writable, type Readable } from "svelte/store";

type Errors = Record<string, any>

interface Store extends Readable<Errors> {
    set: (errors: Errors) => void;
    add: (key: any, value: any) => void;
    remove: (key: any) => void;
};

export class HttpError {
    constructor(public status: number, public message: string) { }

    public isAuthenticationError(): boolean {
        return this.status === 401;
    }
}

export function createErrors(): Store {
    const errorsStore = writable<Record<string, any>>({});
    const { set, subscribe, update } = errorsStore;

    const store = {
        set,
        subscribe,
        remove: function(key: string) {
            update(function(errors: Errors) {
                const { [key]: deleted, ...remaining } = errors;
                return remaining;
            });
        },
        add: function(key: string, value: any) {
            update((errors: Errors) => ({ ...errors, [key]: value }));
        },
    };

    setContext('errors', store)

    return store;
}

export function useErrors(): Store {
    return getContext<Store>('errors');
}
