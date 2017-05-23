export class Identity {
  id: number;
  created: string;
  pgpIpfsHash: string;
  email: string;
  ethereumAddress:string;

  constructor()
  constructor(id: number, created: string, pgpIpfsHash: string, email: string, ethereumAddress: string)
  constructor(id?: number, created?: string, pgpIpfsHash?: string, email?: string, ethereumAddress?: string) {
    this.id = id;
    this.created = created;
    this.pgpIpfsHash = pgpIpfsHash;
    this.email = email;
    this.ethereumAddress = ethereumAddress;
  }


}
