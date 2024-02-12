import { writable, type Readable } from "svelte/store";

type Notifications = Record<string, Notification>;

type NotificationType = 'success' | 'error' | 'warning' | 'info';

type Notification = {
    id: string;
    message: string;
    type: NotificationType;
}

interface Store extends Readable<Notifications> {
    add(message: string, type: NotificationType): void
}

const { subscribe, update } = writable({});

export default {
    subscribe,
    add(message, type) {
        const id = Date.now().toString(36) + Math.random().toString(36).slice(2);

        update((notifications: Notifications) => ({
            ...notifications,
            [id]: { id, message, type },
        }));

        setTimeout(() => update((notifications: Notifications) => {
            const { [id]: removed, ...remaining } = notifications;
            console.log(removed);
            return remaining;
        }), 3000);
    },
} as Store;
