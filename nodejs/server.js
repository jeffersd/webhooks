const PORT = process.env.WEBHOOK_PORT;

if (!PORT) {
    console.error("WEBHOOK_PORT not set");
    process.exit(1);
}
if (!process.env.WEBHOOK_SECRET) {
    console.error("WEBHOOK_SECRET not set");
    process.exit(1);
}

console.log("listening on port:", PORT);
require("./index.js").listen(PORT);
