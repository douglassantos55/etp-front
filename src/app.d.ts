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
        available_terrains: number;
    }

    interface Resource {
        id: number;
        name: string;
        image: string;
        category: Category;
        requirements: Array<Requirement>;
        patents: number;
        investment: number;
        duration: number;
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
        wages_per_hour: number;
        admin_per_hour: number;
        maintenance_per_hour: number;
        downtime: number;
        requirements: Requirement[];
        resources: BuildingResource[];
    }

    interface CompanyBuilding extends Building {
        level: number;
        position: number;
        busy_until?: string;
        completes_at?: string;
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

    interface Staff {
        id: number;
        name: string;
        skill: number;
        talent: number;
        salary: number;
        status: number;
        offer?: number;
        raise?: number;
        poacher_id?: number;
        employer_id: number;
        trainings: Training[];
        busy_until?: string;
    }

    interface Training {
        id: number;
        result: number;
        started_at: string;
        finishes_at?: string;
        completed_at?: string;
    }

    interface Search {
        id: number;
        expertise: number;
        finishes_at: string;
    }
}

export { };
