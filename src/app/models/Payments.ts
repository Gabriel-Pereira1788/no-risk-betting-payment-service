export enum StatusCob {
  ACTIVE = "ATIVA",
}

export interface Debtor {
  cpf: string;
  name: string;
}

export interface CobQRCode {
  qrcode: string;
  imageBase64: string;
}

export interface CobBody {
  expiresAt: number;
  debtor: Debtor;
  value: string;
  keyPix: string;
}

export interface Cob {
  expiresAt: number;
  debtor: Debtor;
  value: string;
  keyPix: string;
  txid: string;
  status: StatusCob;
  loc: {
    id: number;
    location: string;
  };
}
