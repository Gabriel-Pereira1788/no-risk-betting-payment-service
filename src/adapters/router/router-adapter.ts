import { Request, Response, Router as RouterExpress } from "express";

export class RouterAdapter {
  router = RouterExpress();

  post(path: string, callback: (req: Request, res: Response) => void) {
    this.router.post(path, callback);
  }

  get(path: string, callback: (req: Request, res: Response) => void) {
    this.router.get(path, callback);
  }

  use(path: string, route: RouterAdapter) {
    try {
      this.router.use(path, route.router);
    } catch (error) {
      console.log("Error", error);
    }
  }
}
