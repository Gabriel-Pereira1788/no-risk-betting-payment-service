import { HttpContext } from "../../../adapters";
import socketIO  from "../../../socket";
import { PaymentsClientServiceImpl } from "../../services/client/paymentsClient/models";

export class PaymentsController {
  private paymentsClientService: PaymentsClientServiceImpl;

  constructor(paymentsClientServiceImpl: PaymentsClientServiceImpl) {
    this.paymentsClientService = paymentsClientServiceImpl;
  }

  async webHookHandler(context: HttpContext) {
    const body = context.getRequest().body as { pix: { txid: string }[] };

    if (body && body.pix) {
      const clients = socketIO.getClientsList();

      body.pix.forEach((pix) => {
        const client = clients.find((_client) => _client.txid === pix.txid);

        if (client) {
          client.socket.emit(`txid=${client.txid}`, {
            paymentStatus: "success",
          });
        }
      });
    }

    return context.send(200,"success")
  }

  async generateQrCode(context: HttpContext) {
    try {
      const params = context.getRequest().params;

      const qrCodeResponse = await this.paymentsClientService.generateCobQRCode(
        Number(params.id)
      );

      if (qrCodeResponse) {
        socketIO.connect("connection", (socket) => {
          socketIO.addToClientsList({
            txid: params.txid,
            socket,
          });
          socket.emit(`txid=${params.txid}`, {message:"Ola cliente",paymentStatus:"pending"});
        });
        context.send(200, qrCodeResponse);
      }
    } catch (error) {
      console.log("error qrcode", error);
      context.send(500, { message: "Tente novamente mais tarde" });
    }
  }

  async generateCobImmediately(context: HttpContext) {
    try {
      const body = context.getRequest().body;

      const cob = await this.paymentsClientService.generateCobImmediately({
        debtor: {
          cpf: "12345678909",
          name: "Francisco da Silva",
        },
        expiresAt: 3600,
        keyPix: "5ee68dae-af9b-4644-a22a-abc0426a02ed",
        value: "1.00",
      });

      if (cob) {
        context.send(200, { cob });
      }
    } catch (error) {
      context.send(500, { message: "Tente novamente mais tarde" });
    }
  }
}
