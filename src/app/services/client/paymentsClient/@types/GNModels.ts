import { StatusCob } from "../../../../models/Payments";

export interface GNCobRequest {
  calendario: {
    expiracao: number;
  };
  devedor: {
    cpf: string;
    nome: string;
  };
  valor: {
    original: string;
  };
  chave: string;
}

export interface GNLoc {
  id: 2;
  location: string;
  tipoCob: string;
  criacao: string;
}

export interface GNCobResponse {
  calendario: {
    expiracao: number;
  };
  txid: string;
  revisao: number;
  loc: GNLoc;
  location: string;
  status: StatusCob;
  devedor: {
    cpf: string;
    nome: string;
  };
  valor: {
    original: string;
  };
  chave: string;
  solicitacaoPagador: string;
}

export interface GNQrCode {
  qrcode: string;
  imagemQrcode: string;
  linkVisualizacao: string;
}
