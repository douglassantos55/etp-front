// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
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
}

export { };
