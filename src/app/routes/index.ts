import { RouterAdapter } from "../../adapters";
import paymentsRouter from "./payments-router";

const rootRouter = new RouterAdapter();

rootRouter.get("/", (req, res) => {
  res.json({ message: "teste1" });
});

rootRouter.use("/payments", paymentsRouter);

export default rootRouter;
