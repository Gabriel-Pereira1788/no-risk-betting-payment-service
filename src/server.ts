import { authPaymentsService } from "./app/services/server/payments/authPayments";

const PORT = process.env.PORT || "3001";
export class Server {
  static async start(app: any) {
    app.listen(PORT, async () => {

      console.log("Aplicação funcionando na porta:" + PORT);
    });

    await this.initialize()

  }

  private static  async initialize(){
    await authPaymentsService.start();
    await authPaymentsService.refreshToken();
  }
}
