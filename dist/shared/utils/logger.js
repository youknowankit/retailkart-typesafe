import { env } from "#config/env.js";
import pino from "pino";
/*
pino({...}): creates a logger instance
info/debug: production->info otherwise ->debug
pino normally writes structured JSON logs -> works for systems not development friendly readability
pino-pretty: formats to readable terminal output
*/
const logger = pino({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    transport: env.NODE_ENV === "production"
        ? undefined
        : {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid, hostname",
            },
        },
});
export default logger;
//# sourceMappingURL=logger.js.map