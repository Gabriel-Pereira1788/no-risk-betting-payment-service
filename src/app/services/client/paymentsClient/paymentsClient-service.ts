import { ResponseHttp } from "../../../../@types/global";
import { CobBody } from "../../../models/Payments";
import httpClientPayments from "../../server/payments/httpClientPayments/httpClientPayments";
import { GNCobResponse, GNQrCode } from "./@types/GNModels";

import { PaymentsClientServiceImpl } from "./models";
import { PaymentsClientAdapter } from "./paymentsClient-adapter";

export class PaymentsClientService implements PaymentsClientServiceImpl {
  private paymentsClientAdapter = new PaymentsClientAdapter();

  async generateCobImmediately(dataCobRequest: CobBody) {
    const cobBody = this.paymentsClientAdapter.toCobRequest(dataCobRequest);

    try {
      const response: ResponseHttp<GNCobResponse> =
        await httpClientPayments.post("v2/cob", cobBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });

      console.log("response", response.data);
      const cob = this.paymentsClientAdapter.toCobResponse(response.data);
      return cob;
    } catch (error) {
      console.log("Error in playmentsClient-service", error);
    }
  }

  async generateCobQRCode(idLoc: number) {
    try {
      const response: ResponseHttp<GNQrCode> = await httpClientPayments.get(
        `v2/loc/${idLoc}/qrcode`
      );

      const qrCodeData = this.paymentsClientAdapter.toQrCodeData(response.data);
      return qrCodeData;
    } catch (error) {
      console.log("Error in generateCobQRCode", error);
    }
  }
}
