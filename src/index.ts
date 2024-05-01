#!/usr/bin/env node

import { createProxyServer } from "@mutagen-d/node-proxy-server";
import { zts, net, startNodeAndJoinNet } from "libzt";

const key = process.env["ZT_PYLON_SECRET_KEY"];
if (!key) {
  console.error("No secret key provided. Set ZT_PYLON_SECRET_KEY");
  process.exit(0);
}

function createArgParser() {
  let index = 0;
  const args = process.argv.slice(2);

  return (description: string): string => {
    const value = args[index++];

    if (!value) {
      console.log(
        `Missing argument at index ${index.toString()}: ${description}`,
      );
      process.exit(0);
    }
    return value;
  };
}

const arg = createArgParser();
const testArg = (wanted: string) => {
  const actual = arg(wanted);
  if (wanted !== actual) {
    console.error(`Expected argument ${wanted}, was ${actual}`);
    process.exit(0);
  }
};
testArg("refract");
const nwid = arg("nwid");

testArg("--listen-addr");
const listenAddr = arg("listen address");

testArg("--listen-port");
const listenPort = parseInt(arg("listen port"));

zts.init_from_memory(Buffer.from(key, "ascii"));
await startNodeAndJoinNet(undefined, nwid);

const server = createProxyServer({
  createProxyConnection: async (info) => {
    const socket = net.createConnection({
      host: info.dstHost,
      port: info.dstPort,
    });
    return new Promise((resolve, reject) => {
      socket.on("connect", () => {
        resolve(socket);
      });
      socket.on("error", (error: Error) => {
        reject(error);
      });
    });
  },
  auth: false,
});
server.listen(listenPort, listenAddr, () => {
  console.log("proxy-server listening port", listenPort);
});
