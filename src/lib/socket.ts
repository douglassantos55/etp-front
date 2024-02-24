import { PUBLIC_API_HOST } from "$env/static/public";

type Unsubscribe = () => void;
type Callback<T> = (payload: T) => void;

export function connect(token: string) {
    const ws = new WebSocket('ws://' + PUBLIC_API_HOST + '/notifications/ws');

    ws.onopen = () => ws.send(token);

    ws.onmessage = console.log;
}

const subscribers: Map<string, Callback<any>[]> = new Map();

export function subscribe<T>(event: string, cb: Callback<T>): Unsubscribe {
    let callbacks = subscribers.get(event);

    if (callbacks === undefined) {
        callbacks = [];
    }

    const index = callbacks.push(cb);
    subscribers.set(event, callbacks);

    return function() {
        const callbacks = subscribers.get(event);
    }
}
