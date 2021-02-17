const PORT = process.env.WEBHOOK_PORT;

console.log("listening on port:", PORT);
require("./index.js").listen(PORT);
