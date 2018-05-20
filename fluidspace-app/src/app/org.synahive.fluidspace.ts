import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.synahive.fluidspace{
   export class ContactDetails {
      email: string;
      mobilePhone: string;
      address: Address;
   }
   export class Address {
      entityName: string;
      street: string;
      city: string;
      state: string;
      country: string;
      zip: string;
   }
   export class lotFeatures {
      climateControlled: boolean;
      perishableStorage: boolean;
      automated: boolean;
      fragileHandling: boolean;
      palletRacking: boolean;
      shelving: boolean;
      mobileShelving: boolean;
      multiTtierRacking: boolean;
      mezzanineFlooring: boolean;
   }
   export enum lotSize {
      SMALL,
      MEDIUM,
      LARGE,
      EXTRALARGE,
   }
   export class lotUser extends Participant {
      userId: string;
      companyName: string;
      contactDetails: ContactDetails;
   }
   export class lotAdmin extends lotUser {
      authorized: string[];
   }
   export class Contract extends Asset {
      contractId: string;
      renter: lotUser;
      owner: lotUser;
      lot: warehouselot;
      consignment: Consignment;
      arrivalDateTime: Date;
      numHours: number;
   }
   export class warehouselot extends Asset {
      warehouselotID: string;
      address: Address;
      coordinates: string;
      ratePerHour: number;
      lotSize: lotSize;
      features: lotFeatures;
      owner: lotUser;
   }
   export class Consignment extends Asset {
      consignmentId: string;
      lotSizeNeeded: lotSize;
      goodsType: string;
      owner: lotUser;
   }
   export class Reserve extends Transaction {
      contract: Contract;
   }
// }
