import { Elysia } from "elysia";
import figlet from "figlet";
import SmartSmsSolutions from "../index";

const app = new Elysia();

const smartSmsSolutions = new SmartSmsSolutions(
  process.env.SMART_SMS_API_KEY || ""
);

app.get("/", async () => {
  return await smartSmsSolutions.getBalance();
});

app.listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${
    app.server?.port
  } ${figlet.textSync("Smart SMS Solutions")}`
);
