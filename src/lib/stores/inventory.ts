import { writable, type Writable } from "svelte/store"

type InventoryStore = Writable<any> & {
    getSourcingCost(resourceId: number): number;
}

const { subscribe, set } = writable();

export const inventory: InventoryStore = {
    subscribe,
    set,
    getSourcingCost: function(resourceId: number): number {
        console.log(resourceId);
        return 15;
    },
}
