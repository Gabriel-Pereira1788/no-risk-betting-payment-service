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

paymentsRouter.post("/webhook/:pix?", async (req, res) => {
  console.log("req", req.body);
  return res.send("200");
});

paymentsRouter.get("/:id/qrcode", async (req, res) => {
  const adapter = new ExpressAdapter(req, res);

  return paymentsClientController.generateQrCode(adapter);

  // {
  //   "calendario": {
  //     "expiracao": 3600
  //   },
  //   "devedor": {
  //     "cpf": "12345678909",
  //     "nome": "Francisco da Silva"
  //   },
  //   "valor": {
  //     "original": "124.45"
  //   },
  //   "chave": "5ee68dae-af9b-4644-a22a-abc0426a02ed",
  //   "solicitacaoPagador": "Informe o número ou identificador do pedido."
  // }
});

export default paymentsRouter;
