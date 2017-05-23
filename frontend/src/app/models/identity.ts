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

/*
[{"id":1,
  "created":"2015-10-04T06:53:59Z",
  "pgpIpfsHash":"QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4Vt",
  "email":"geoffreyamall@gmail.com",
  "ethereumAddress":"0x17220f161bc7ffcdae60afcc3b232817c67d1131"}]
*/
