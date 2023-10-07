import { Request, Response } from "express";
import { HttpContext } from "../implementations";

export class ExpressAdapter implements HttpContext {
  constructor(private request: Request, private response: Response) {}
  getRequest() {
    return {
      body: this.request.body,
      headers: this.request.headers,
      params: this.request.params,
    };
  }
  send(status: number, body: any): void {
    this.response.status(status).json(body);
  }

  render(viewName: string, variables: { [key: string]: any }) {
    this.response.render(viewName, variables);
  }
}
