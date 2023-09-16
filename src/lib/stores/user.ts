import { writable, type Writable } from "svelte/store";

type User = {
    company: {
        available_cash: number;
    };
}

type UserStore = Writable<User> & {
    incrementCash: (amount: number) => void
    reduceCash: (amount: number) => void
}

const { subscribe, update, set } = writable<User>({ company: { available_cash: 1000 } });

export const user: UserStore = {
    subscribe,
    set,
    incrementCash: function(amount: number) {
        update((user: any) => ({
            company: {
                ...user.company,
                available_cash: user.company.available_cash + amount
            }
        }));
    },
    reduceCash: function(amount: number) {
        update((user: any) => ({
            company: {
                ...user.company,
                available_cash: user.company.available_cash - amount
            }
        }));
    },
}
