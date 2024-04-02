import { createConnection, set } from "mongoose";
import { mongo_uri, node_env } from "./config";

const mongoInstance = createConnection(mongo_uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
});

if (node_env === "development") {
    set("debug", true);
}

mongoInstance.on("open", () => {
    console.log([new Date()], "Connection to DB is established");
});

mongoInstance.on("reconnected", () => {
    console.log([new Date()], "Connection reestablished with DB ...");
});

mongoInstance.on("disconnected", () => {
    console.log([new Date()], "Connecting db ...");
});

mongoInstance.on("error", (err) => {
    console.log(
        [new Date()],
        "Error occurred while connecting to db \nError Stack: ",
        err
    );
});

export default mongoInstance;
