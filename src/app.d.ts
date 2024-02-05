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
        category: Category;
        requirements: Array<Requirement>;
    }

    interface Category {
        id: number;
        name: string;
        resources?: Resource[];
    }

    interface Requirement {
        resource: Resource;
        quantity: number;
        quality: number;
    }

    interface Building {
        id: number;
        name: string;
        level: number;
        position: number;
        name: string;
        downtime: number;
        wages_per_hour: number;
        resources: BuildingResource[];
        requirements: Requirement[];
        busy_until: string;
    }

    interface BuildingResource {
        resource: Resource;
        qty_per_hour: number;
        max_quality: number;
    }

    interface Inventory {
        items: InventoryItem[];
    }

    interface InventoryItem {
        quantity: number;
        quality: number;
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
        company: Company;
        quality: number;
        quantity: number;
        price: number;
        resource: Resource;
    }

    interface Purchase {
        id: number;
        order: Order;
        quantity: number;
        company: Company;
    }

    interface Loan {
        id: number;
        interest_rate: number;
        interest_paid: number;
        payable_from: string;
        principal: number;
        principal_paid: number;
        delayed_payments: number;
    }

    interface Bond {
        id: number;
        amount: number;
        purchased: number;
        interest_rate: number;
        company?: Company;
        canceled_at?: string;
        creditors: Creditor[];
    }

    interface Creditor {
        id: number;
        name: string;
        logo: string;
        interest_rate: number;
        interest_rate: number;
        interest_paid: number;
        payable_from: string;
        principal: number;
        principal_paid: number;
        delayed_payments: number;
    }
}

export { };
