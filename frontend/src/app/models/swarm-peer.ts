export class SwarmPeer {
  Addr: string;
  Peer: string;
  Latency: string;
  Muxer: string;
  Streams: any[];

  constructor()
  constructor(Addr: string, Peer: string, Latency: string, Muxer: string, Streams: any[])
  constructor(Addr?: string, Peer?: string, Latency?: string, Muxer?: string, Streams?: any[]) {
    this.Addr = Addr;
    this.Peer = Peer;
    this.Latency = Latency;
    this.Muxer = Muxer;
    this.Streams = Streams;
  }
}
