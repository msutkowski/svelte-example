import App from './App.svelte';
import { rest, setupWorker } from 'msw';

let count = 0;

export const worker = setupWorker(
    ...[
        rest.put<{ amount: number }>('/increase', (req, res, ctx) => {
            const { amount } = req.body;
            count = count += amount;

            return res(ctx.json({ count }));
        }),
        rest.put<{ amount: number }>('/decrease', (req, res, ctx) => {
            const { amount } = req.body;
            count = count -= amount;

            return res(ctx.json({ count }));
        }),
        rest.get('/count', (req, res, ctx) => {
            return res(ctx.json({ count }));
        }),
    ],
);

worker.start();

const app = new App({
    target: document.body,
});

export default app;
