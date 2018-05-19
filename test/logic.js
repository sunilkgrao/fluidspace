/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const AdminConnection = require('composer-admin').AdminConnection;
const BrowserFS = require('browserfs/dist/node/index');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const path = require('path');

require('chai').should();

const bfs_fs = BrowserFS.BFSRequire('fs');
const NS = 'org.synahive.fluidspace';

describe('Fluid Space Exchange', () => {

    // let adminConnection;
    let businessNetworkConnection;

    before(() => {
        BrowserFS.initialize(new BrowserFS.FileSystem.InMemory());
        const adminConnection = new AdminConnection({ fs: bfs_fs });
        return adminConnection.createProfile('defaultProfile', {
            type: 'embedded'
        })
            .then(() => {
                return adminConnection.connect('defaultProfile', 'admin', 'adminpw');
            })
            .then(() => {
                return BusinessNetworkDefinition.fromDirectory(path.resolve(__dirname, '..'));
            })
            .then((businessNetworkDefinition) => {
                return adminConnection.deploy(businessNetworkDefinition);
            })
            .then(() => {
                businessNetworkConnection = new BusinessNetworkConnection({ fs: bfs_fs });
                return businessNetworkConnection.connect('defaultProfile', 'lot-network', 'admin', 'adminpw');
            });
    });

    describe('#reservewarehouselot', () => {

        it('should be able to reserve a warehouselot', () => {
            const factory = businessNetworkConnection.getBusinessNetwork().getFactory();

            // create the owner/renter
            const dan = factory.newResource(NS, 'lotUser', 'dan@email.com');
            dan.firstName = 'Dan';
            dan.lastName = 'Selman';

            const simon = factory.newResource(NS, 'lotUser', 'simon@email.com');
            simon.firstName = 'Simon';
            simon.lastName = 'Stone';

            // create the warehouselot
            const warehouselot = factory.newResource(NS, 'warehouselot', '123 Maple');
            warehouselot.owner = factory.newRelationship(NS, 'lotUser', dan.$identifier);

            // create simon vehicle
            const jeep = factory.newResource(NS, 'Vehicle', 'Jeep');
            jeep.licensePlate = 'RS61KR';
            jeep.owner = factory.newRelationship(NS, 'lotUser', simon.$identifier);

            // create the contract
            const contract = factory.newResource(NS, 'Contract', 'Alpha');
            contract.owner = factory.newRelationship(NS, 'lotUser', dan.$identifier);
            contract.renter = factory.newRelationship(NS, 'lotUser', simon.$identifier);
            contract.lot = factory.newRelationship(NS, 'warehouselot', warehouselot.$identifier);
            contract.vehicle = factory.newRelationship(NS, 'Vehicle', jeep.$identifier);
            contract.numHours = 1;


            // create the reserve transaction
            const reserve = factory.newTransaction(NS, 'Reserve');
            reserve.contract = factory.newRelationship(NS, 'Contract', contract.$identifier);



            // the owner should of the warehouselot should be dan
            warehouselot.owner.$identifier.should.equal(dan.$identifier);


            // Get the asset registry.
            return businessNetworkConnection.getAssetRegistry(NS + '.Contract')
                .then((assetRegistry) => {

                    // add the contract to the asset registry.
                    return assetRegistry.add(contract)
                        .then(() => {
                            return businessNetworkConnection.getParticipantRegistry(NS + '.lotUser');
                        })
                        .then((participantRegistry) => {
                            // add the reservers
                            return participantRegistry.addAll([dan, simon]);
                        })
                        .then(() => {
                            // submit the transaction
                            return businessNetworkConnection.submitTransaction(reserve);
                        })
                        .then(() => {
                            return businessNetworkConnection.getAssetRegistry(NS + '.Contract');
                        })
                        .then((assetRegistry) => {
                            // re-get the contract
                            return assetRegistry.get(contract.$identifier);
                        })
                        .then((newContract) => {
                            // the renter on the contract should not be simon
                            newContract.renter.$identifier.should.equal(simon.$identifier);
                            // the lotowner on the contract should be dan
                            newContract.owner.$identifier.should.equal(dan.$identifier);
                        });
                });
        });
    });
});
