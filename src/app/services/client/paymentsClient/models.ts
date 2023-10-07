import { Cob, CobBody, CobQRCode } from "../../../models/Payments";

export interface Credentials {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface PaymentsClientServiceImpl {
  generateCobImmediately(dataCobRequest: CobBody): Promise<Cob | undefined>;
  generateCobQRCode(idLoc: number): Promise<CobQRCode | undefined>;
}
