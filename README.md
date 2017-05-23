PGP - ETH Identity
---

###Getting Started

`git clone https://github.com/GeoffMall/angular-pictures.git`

`brew install ipfs`  - if ipfs not installed

`ipfs init`

`ipfs daemon`

in another terminal tab

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'`

`ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'`

`cd frontend`

`npm install`

`ng serve`

[http://localhost:4200](http://localhost:4200)

[http://localhost:5001/webui](http://localhost:5001/webui)

From then on its just `ipfs daemon` and `ng serve`