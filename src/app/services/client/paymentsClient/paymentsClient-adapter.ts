import { Cob, CobBody, CobQRCode } from "../../../models/Payments";
import { GNCobRequest, GNCobResponse, GNQrCode } from "./@types/GNModels";

export class PaymentsClientAdapter {
  toCobRequest(cob: CobBody): GNCobRequest {
    return {
      calendario: {
        expiracao: cob.expiresAt,
      },
      chave: cob.keyPix,
      devedor: {
        cpf: cob.debtor.cpf,
        nome: cob.debtor.name,
      },
      valor: {
        original: cob.value,
      },
    };
  }

  toCobResponse(cobApi: GNCobResponse): Cob {
    return {
      debtor: {
        cpf: cobApi.devedor.cpf,
        name: cobApi.devedor.nome,
      },
      expiresAt: cobApi.calendario.expiracao,
      keyPix: cobApi.chave,
      value: cobApi.valor.original,
      loc: {
        id: cobApi.loc.id,
        location: cobApi.loc.location,
      },
      txid: cobApi.txid,
      status: cobApi.status,
    };
  }

  toQrCodeData(qrCodeApi: GNQrCode): CobQRCode {
    return {
      imageBase64: qrCodeApi.imagemQrcode,
      qrcode: qrCodeApi.qrcode,
    };
  }
}
