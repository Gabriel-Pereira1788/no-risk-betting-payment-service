import { ExpressAdapter, RouterAdapter } from "../../adapters";
import { PaymentsController } from "../controllers/payments/payments-controller";
import { PaymentsClientService } from "../services/client/paymentsClient/paymentsClient-service";
const paymentsRouter = new RouterAdapter();
const paymentsClientService = new PaymentsClientService();
const paymentsClientController = new PaymentsController(paymentsClientService);

//TODO: Modificar para posts
paymentsRouter.get("/cob", async (req, res) => {
  const adapter = new ExpressAdapter(req, res);
  return paymentsClientController.generateCobImmediately(adapter);
});

paymentsRouter.post("/webhook(/pix)?", async (req, res) => {
  const adapter = new ExpressAdapter(req, res);

  return paymentsClientController.webHookHandler(adapter);
});

paymentsRouter.get("/:id/:txid/qrcode", async (req, res) => {
  const adapter = new ExpressAdapter(req, res);

  return paymentsClientController.generateQrCode(adapter);
});

export default paymentsRouter;
