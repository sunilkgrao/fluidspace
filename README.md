# Hyper-ledger Warehouse Network Design

### Define Files for BNA

```
npm install -g composer-cli

npm install -g composer-rest-server

npm install -g generator-hyperledger-composer

npm install -g yo

mkdir ~/fabric-tools && cd ~/fabric-tools

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.zip
unzip fabric-dev-servers.zip

./downloadFabric.sh

./startFabric.sh

./createPeerAdminCard.sh

yo hyperledger-composer:businessnetwork
```


yeoman creates all the required files

Edit the model, logic, and test files

### Deploy Initial Business Network:

```
composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile fluidspace@0.0.1.bna

composer network start --networkName fluidspace --networkVersion 0.0.2 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer-rest-server -p 34534 -c admin@fluidspace
```

### Upgrade business network :

```
composer archive create -t dir -n .

composer network install --card PeerAdmin@hlfv1 --archiveFile fluidspace@0.0.2.bna

composer network upgrade -n fluidspace -V 0.0.2 -c PeerAdmin@hlfv1

composer card import --file networkadmin.card

composer-rest-server -p 34534 -c admin@fluidspace
```

### Create Angular App

```
yo hyperledger-composer:angular
```

### Launch Angular App after load

```
cd ~/fabric-tools

./startFabric.sh

cd ~/Development/blockchain/hyperledger/fluidspace/fluidspace

composer network install --card PeerAdmin@hlfv1 --archiveFile fluidspa
ce@0.0.2.bna

composer network start --networkName fluidspace --networkVersion 0.0.2
 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file network
admin.card

cd fluidspace-app

npm start
```

## Design

### Blockchain State Storage

All transactions submitted through a business network are stored on the blockchain ledger, and the current state of assets and participants are stored in the blockchain state database. The blockchain distributes the ledger and the state database across a set of peers and ensures that updates to the ledger and state database are consistent across all peers using a consensus algorithm.

Peers:

* Certificate Authority Chain:
* Validation Peers:
* Supply Chain Financing:

Consensus Algorithm:


### Connection Profiles

Hyperledger Composer uses *Connection Profiles* to define the system to connect to. A connection profile is a JSON document the is part of a business network card. These profiles are usually provided by the creator of the system they refer to and should be used to create business network cards in order to be able to connect to that system.

### Assets

Assets are tangible or intangible goods, services, or property, and are stored in registries. Assets can represent almost anything in a business network, for example, a house for sale, the sale listing, the land registry certificate for that house, and the insurance documents for that house may all be assets in one or more business networks.
Assets must have a unique identifier, but other than that, they can contain whatever properties you define. Assets may be *related to* other assets or participants.

### Participants

Participants are members of a business network. They may own assets and submit transactions. Participant types are modeled, and like assets, must have an identifier and can have any other properties as required. A participant can be mapped to one or multiple identities.

### Identities

An identity is a digital certificate and private key. Identities are used to transact on a business network and must be mapped to a participant in the business network. A single identity is stored in a business network card and if that identity has been mapped to a participant, it allows the user of that business network card to transact on a business network as that participant.

### Business Network cards

Business network cards are a combination of an identity, a connection profile, and metadata, the metadata optionally containing the name of the business network to connect to. Business network cards simplify the process of connecting to a business network, and extend the concept of an identity outside the business network to a 'wallet' of identities, each associated with a specific business network and connection profile.

### Transactions

Transactions are the mechanism by which participants interact with assets. This could be as simple as a participant placing a bid on a asset in an auction, or an auctioneer marking an auction closed, automatically transferring ownership of the asset to the highest bidder.

### Queries

Queries are used to return data about the blockchain world-state. Queries are defined within a business network, and can include variable parameters for simple customization. By using queries, data can be easily extracted from your blockchain network. Queries are sent by using the Hyperledger Composer API.

### Events

Events are defined in the business network definition in the same way as assets or participants. Once events have been defined, they can be emitted by transaction processor functions to indicate to external systems that something of importance has happened to the ledger. Applications can subscribe to emitted events through the `composer-client` API.

### Access Control

Business networks may contain a set of access control rules. Access control rules allow fine-grained control over what participants have access to what assets in the business network and under what conditions. The access control language is rich enough to capture sophisticated conditions declaratively, such as "only the owner of a vehicle can transfer ownership of the vehicle". Externalizing access control from transaction processor function logic makes it easier to inspect, debug, develop and maintain.

### Historian registry

The historian is a specialised registry which records successful transactions, including the participants and identities that submitted them. The historian stores transactions as `HistorianRecord` assets, which are defined in the Hyperledger Composer system namespace.
