declare module "@mutagen-d/node-proxy-server" {
  declare interface ConnectionInfo {
    dstHost: string;
    dstPort: number;
    srcHost: string;
    srcPort: number;
  }

  declare interface HttpRequestOptions {
    method: string;
    url: string;
    version: string;
    headers: Record<string, string>;
    body: Buffer;
  }

  declare type CreateProxyConnection = (
    info: ConnectionInfo,
    options?: HttpRequestOptions,
  ) => Promise<import("stream").Duplex>;

  declare interface ProxyServerOptions {
    createProxyConnection?: CreateProxyConnection;
    auth?: boolean;
  }

  declare function createProxyServer(
    options: ProxyServerOptions,
  ): import("net").Server;
}
