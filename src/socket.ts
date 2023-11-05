import { createServer } from "http";
import { Server as ServerIO, Socket } from "socket.io";
const httpServer = createServer();
const io = new ServerIO(httpServer, {
  path: "/socket.io",

  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(8085);

type Client = {
  txid: string;
  socket: Socket;
};

export class SocketIO {
  io = io;
  private clients: Client[] = [];

  start() {}

  connect(room: string, callbackConnect: (socket: Socket) => void) {
    io.on(room, (socket) => callbackConnect(socket));
  }

  addToClientsList(client: Client) {
    this.clients.push(client);
  }

  getClientsList(){
    return this.clients
  }

  removeFromClientsList(_client: Client) {
    const newClients = this.clients.filter(
      (client) => client.txid !== _client.txid
    );

    this.clients = newClients;
  }
}

const socketIO = new SocketIO();

export default socketIO;
