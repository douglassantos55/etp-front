import { getCompanyInventory } from "$lib/api/inventory";
import { writable, type Readable, derived } from "svelte/store"

type InventoryStore = Readable<Inventory> & {
    load(): Promise<void>;
}

const { subscribe, set } = writable<Inventory>();

export const inventory: InventoryStore = {
    subscribe,
    load: async function(this): Promise<void> {
        set(await getCompanyInventory(fetch));
    },
}

export const stocks: Readable<Record<number, Record<number, number>>> = derived(inventory, function($inventory) {
    const stocks: Record<number, Record<number, number>> = {};
    if ($inventory !== undefined) {
        for (const item of $inventory.items) {
            if (stocks[item.resource.id] === undefined) {
                stocks[item.resource.id] = {};
            }
            stocks[item.resource.id][item.quality] = item.quantity;
        }
    }
    return stocks;
});

export const costs: Readable<Record<number, Record<number, number>>> = derived(inventory, function($inventory) {
    const costs: Record<number, Record<number, number>> = {};
    if ($inventory !== undefined) {
        for (const item of $inventory.items) {
            if (costs[item.resource.id] === undefined) {
                costs[item.resource.id] = {};
            }
            costs[item.resource.id][item.quality] = item.cost;
        }
    }
    return costs;
})
