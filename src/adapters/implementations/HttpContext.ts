import { Request, Router } from "express";

export interface HttpContext {
  getRequest(): Pick<Request, "headers" | "body" | "params">;
  send(status: number, body: any): void;
  render(viewName: string, variables: { [key: string]: any }): void;
}
