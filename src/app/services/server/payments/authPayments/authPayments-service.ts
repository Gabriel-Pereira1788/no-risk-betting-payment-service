import { ResponseHttp } from "../../../../../@types/global";
import httpClientPayments from "../httpClientPayments/httpClientPayments";
import { PaymentsCredentials } from "../models";
import { paymentsFs } from "../paymentsFs";
import https from "https";

export class AuthPaymentsService {
  private credentialsPaymentsApiBuffered: string | undefined;

  setCredentials(credentialsBuffered: string) {
    this.credentialsPaymentsApiBuffered = credentialsBuffered;
  }

  getCredentials() {
    return this.credentialsPaymentsApiBuffered;
  }

  async start() {
    try {
      const agent = await this.getHttpsAgent();
      this.createCredentialsBuffered();

      httpClientPayments.defaults.httpsAgent = agent;
    } catch (error) {
      console.log("Error on start auth payments service", error);
    }
  }

  private async getHttpsAgent() {
    const cert = await paymentsFs.readCert();

    const agent = new https.Agent({
      pfx: cert,
      passphrase: "",
    });

    return agent;
  }

  private createCredentialsBuffered() {
    const credentials = Buffer.from(
      `${process.env.SECRET_CLIENT_ID_PAY}:${process.env.SECRET_KEY_PAY}`
    ).toString("base64");

    this.setCredentials(credentials);
  }

  private async getAccessToken(): Promise<string | undefined> {
    try {
      const credentials: ResponseHttp<PaymentsCredentials> =
        await httpClientPayments({
          method: "POST",
          url: "oauth/token",
          headers: {
            Authorization: "Basic " + this.credentialsPaymentsApiBuffered,
            "Content-Type": "application/json",
          },
          data: {
            grant_type: "client_credentials",
          },
        });

      console.log("credentials", credentials.data);
      if (credentials.data.access_token) {
        return credentials.data.access_token;
      }
    } catch (error) {
      console.log(
        "Error getting access token in payments-service.ts, LN 9",
        error
      );
    }
  }

  async refreshToken() {
    try {
      const token = await this.getAccessToken();
      if (token) {
        httpClientPayments.defaults.headers.common.Authorization =
          "Bearer " + token;
        console.log("Token has been updated");
      }
    } catch (error) {
      console.log("Error in refresh token in payments-service.ts", error);
    }
  }
}

export const authPaymentsService = new AuthPaymentsService();
