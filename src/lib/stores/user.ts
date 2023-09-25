import { writable, type Writable } from "svelte/store";

type User = {
    available_cash: number;
}

type UserStore = Writable<User> & {
    incrementCash: (amount: number) => void
    reduceCash: (amount: number) => void
}

const { subscribe, update, set } = writable<User>({ available_cash: 1000 });

export const user: UserStore = {
    subscribe,
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
