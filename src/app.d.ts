// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    interface User {
        id: number;
        company_name: string;
        company_logo: string;
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
        qty: number;
        resource: Resource;
        sourcing_cost: number;
    }

    interface OrderItem {
        qty: number;
        price: number;
        user: User;
        quality: number;
        resource: Resource;
    }
}

export { };
