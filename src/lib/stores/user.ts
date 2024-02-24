import { writable, type Writable } from "svelte/store";

type UserStore = Writable<Company> & {
    incrementCash: (amount: number) => void
    reduceCash: (amount: number) => void
}

const { subscribe, update, set } = writable<Company>();

export const user: UserStore = {
    subscribe,
    update,
    set,
    incrementCash: function(amount: number) {
        update((user: any) => ({
            ...user,
            available_cash: user.company.available_cash + amount
        }));
    },
    reduceCash: function(amount: number) {
        update((user: any) => ({
            ...user,
            available_cash: user.company.available_cash - amount
        }));
    },
}

export function getToken(): string {
    const token = localStorage.getItem("access_token");
    if (token == null) {
        return "";
    }
    return token;
}
