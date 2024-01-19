// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    interface Company {
        id: number;
        name: string;
        logo: string;
        available_cash: number;
        available_slots: number;
    }

    interface Resource {
        id: number;
        name: string;
        image: string;
        requirements: Array<Requirement>;
    }

    interface Requirement {
        resource: Resource;
        qty: number;
    }

    interface Building {
        id: number;
        name: string;
        level: number;
        position: number;
        name: string;
        wages_hour: number;
        resources: BuildingResource[];
    }

    interface BuildingResource {
        resource: Resource;
        production_hour: number;
    }

    interface InventoryItem {
        quantity: number;
        resource: Resource;
        cost: number;
    }

    interface OrderItem {
        qty: number;
        price: number;
        user: Company;
        quality: number;
        resource: Resource;
    }

    interface Order {
        id: number;
        user: Company;
        quality: number;
        qty: number;
        price: number;
        resource: Resource;
    }

    interface Purchase {
        id: number;
        order: Order;
        qty: number;
    }
}

export { };
