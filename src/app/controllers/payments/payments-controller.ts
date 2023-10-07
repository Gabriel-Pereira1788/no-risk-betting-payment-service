import { HttpContext } from "../../../adapters";
import { PaymentsClientServiceImpl } from "../../services/client/paymentsClient/models";

export class PaymentsController {
  private paymentsClientService: PaymentsClientServiceImpl;

  constructor(paymentsClientServiceImpl: PaymentsClientServiceImpl) {
    this.paymentsClientService = paymentsClientServiceImpl;
  }

  async generateQrCode(context: HttpContext) {
    try {
      const params = context.getRequest().params;

      const qrCodeResponse = await this.paymentsClientService.generateCobQRCode(
        params.id
      );

      if (qrCodeResponse) {
        context.render("qrcode", {
          qrCodeImage: qrCodeResponse?.imageBase64,
        });
      }
    } catch (error) {}
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
