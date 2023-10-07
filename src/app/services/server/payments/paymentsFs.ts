import fs from "fs";
import path from "path";

const GN_CERT = process.env.GN_CERT;

class PaymentsFs {
  async readCert() {
    const cert = fs.readFileSync(
      path.resolve(__dirname, `../../../../certs/${GN_CERT}`)
    );

    return cert;
  }
}

export const paymentsFs = new PaymentsFs();
