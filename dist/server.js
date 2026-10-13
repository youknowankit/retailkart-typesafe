// import "dotenv/config";
import app from "./app.js";
import { env } from "#config/env.js";
import connectDB from "#database/connectDB.js";
import logger from "#shared/utils/logger.js";
// const PORT = process.env.PORT;
const startServer = async () => {
    try {
        await connectDB();
        app.listen(env.PORT, () => {
            logger.info({ port: env.PORT }, `Server started successfully`);
        });
    }
    catch (error) {
        logger.error({ err: error }, "Error starting server");
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map