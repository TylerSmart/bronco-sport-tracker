import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TrackerInfo {
  id: string;
  vin: string;
  receiptDate: string;
  releaseDate: string;
  etaStartDate: string;
  etaEndDate: string;
  productionDate: string;
  shipmentDate: string;
  transitDate: string;
  make: string;
  year: string;
  model: string;
  groupOrderType: string;
  trim: string;
  vehicleLineDescription: string;
  market: string;
  status: string;
  primaryStatus: string;
  windowSticker: string;
  finalDeliveredDate: string;
  attributes: { [key: string]: string };
  custOrderDealer: CustOrderDealer;
  custOrderPartsInfo: CustOrderPartsInfo;
  custOrderImgToken: string;
}

export interface CustOrderDealer {
  dealerName: string;
  dealerUrl: string;
  dealerEmail: string;
  dealerTelephone: string;
  routeURL: string;
  custOrderDealerAddress: CustOrderDealerAddress;
}

export interface CustOrderDealerAddress {
  state: string;
  address1: string;
  address2: string;
  address3: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CustOrderPartsInfo {
  Accessories: Accessory[];
  Packages: Package[];
  Interior: Interior[];
  'Model Information': ModelInformation[];
  Exterior: Exterior[];
  Other: Other[];
}

export interface Accessory {
  name: string;
  parts: AccessoryPart[];
}

export interface AccessoryPart {
  attributes: { [key: string]: string };
}

export interface Exterior {
  name: string;
  parts: AccessoryPart[];
}

export interface Interior {
  name: string;
  parts: AccessoryPart[];
}

export interface ModelInformation {
  name: string;
  parts: AccessoryPart[];
}

export interface Other {
  name: string;
  parts: OtherPart[];
}

export interface OtherPart {
  attributes: Attributes;
}

export interface Attributes {
  werscode: string;
  description: string;
  isVisible: string;
  BP2_PartDescriptions_Body_Code?: string;
  BP2_PartDetails_Body_Code?: string;
}

export interface Package {
  name: string;
  parts: AccessoryPart[];
}

export interface EtisInfo {
  electronicControlUnits: ElectronicControlUnit[];
  systemsInstalled: SystemsInstalled;
}

export interface ElectronicControlUnit {
  acronym: string;
  nodeId: string;
  description: string;
  assemblyPartNo: string;
  derivedAssemblyPartNo: string;
  softwarePartNo: null | string;
  hardwarePartNo: string;
  lastChecked: string;
}

export interface SystemsInstalled {
  brakingEquipmentFeatures: Feature[];
  steeringFeatures: Feature[];
  lampsAndElectricalFeatures: Feature[];
  axlesWheelsSuspensionFeatures: Feature[];
  otherEquipmentFeatures: Feature[];
}

export interface Feature {
  code: string;
  description: string;
}

export class Vehicle {
  public type?: string;

  constructor(
    private vin: string,
    private order: string,
    public reserved: boolean
  ) {}

  async loadData(): Promise<[EtisInfo, TrackerInfo]> {
    return Promise.all([this.loadEtisData(), this.loadTrackerData()]);
  }

  async loadEtisData() {
    return fetch(`${environment.api}/vehicle/etis?vin=${this.vin}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.error(res.error);
          return {};
          // throw res.error;
        }
        return res.data;
      });
  }

  async loadTrackerData() {
    return fetch(
      `${environment.api}/vehicle/tracker?vin=${this.vin}&order=${this.order}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error || res.data.vin == 'Error') {
          console.error(
            res.error ||
              `Failed to get tracker data for VIN ${this.vin} and Order ${this.order}`
          );
          throw res.error;
        }
        return res.data;
      });
  }
}

export class BroncoSport extends Vehicle {
  public type = 'sport';

  constructor(vin: string, order: string, reserved: boolean) {
    super(vin, order, reserved);
  }
}

export class Bronco extends Vehicle {
  public type = 'bronco';

  constructor(vin: string, order: string, reserved: boolean) {
    super(vin, order, reserved);
  }
}

const VEHICLE_DATA = [
  {
    vin: '3FMCR9D9XMRB06425',
    order: 'L08P',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '3FMCR9D91MRB06426',
    order: 'L09P',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '3FMCR9D92MRB06421',
    order: 'L04P',
    reserved: true,
    type: 'sport',
  },
  {
    vin: '3FMCR9D93MRB06427',
    order: 'L10P',
    reserved: true,
    type: 'sport',
  },
  {
    vin: '3FMCR9D90MRB06420',
    order: 'L03P',
    reserved: true,
    type: 'sport',
  },
  {
    vin: '3FMCR9D93MRA88611',
    order: 'C001',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '3FMCR9D94MRA88858',
    order: 'T005',
    reserved: true,
    type: 'sport',
  },
  {
    vin: '3FMCR9D94MRB06419',
    order: 'L02P',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '3FMCR9D96MRB06423',
    order: 'L06P',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '3FMCR9D98MRB06424',
    order: 'L07P',
    reserved: true,
    type: 'sport',
  },
  {
    vin: '3FMCR9D94MRB06422',
    order: 'L05P',
    reserved: false,
    type: 'sport',
  },
  {
    vin: '1FMDE5CH5MLA63368',
    order: '2479',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMEE5BP8MLA69503',
    order: 'E05S',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMDE5BH8MLA73054',
    order: 'B18S',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMDE5APXMLA71072',
    order: 'E41S',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMEE5BH4MLA74349',
    order: 'C06A',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMEE5EP4MLA41368',
    order: 'K02P',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMEE5EP7MLA41154',
    order: 'P00P',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMEE5EP9MLA40829',
    order: 'N285',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMEE5EP9MLA40684',
    order: 'K01C',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMDE5CP5MLA76662',
    order: 'T79J',
    reserved: false,
    type: 'bronco',
  },
  {
    vin: '1FMEE5DP4MLA63453',
    order: '0180',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMEE5DP7MLA74463',
    order: 'T02C',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMEE5DP1MLA74507',
    order: 'B52S',
    reserved: true,
    type: 'bronco',
  },
  {
    vin: '1FMDE5BHXMLA78711',
    order: '0558',
    reserved: true,
    type: 'bronco',
  },
];

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor() {}

  // get vehicles() {
  //   return VEHICLE_DATA.map((vehicle) =>
  //     vehicle.type == 'sport'
  //       ? new BroncoSport(vehicle.vin, vehicle.order, vehicle.reserved)
  //       : new Bronco(vehicle.vin, vehicle.order, vehicle.reserved)
  //   );
  // }

  get broncos() {
    return VEHICLE_DATA.filter((vehicle) => vehicle.type == 'bronco').map(
      (vehicle) => new Bronco(vehicle.vin, vehicle.order, vehicle.reserved)
    );
  }

  getBroncos() {
    return VEHICLE_DATA.filter((vehicle) => vehicle.type == 'bronco').map(
      (vehicle) => new Bronco(vehicle.vin, vehicle.order, vehicle.reserved)
    );
  }

  get sports() {
    return VEHICLE_DATA.filter((vehicle) => vehicle.type == 'sport').map(
      (vehicle) => new BroncoSport(vehicle.vin, vehicle.order, vehicle.reserved)
    );
  }

  getSports() {
    return VEHICLE_DATA.filter((vehicle) => vehicle.type == 'sport').map(
      (vehicle) => new BroncoSport(vehicle.vin, vehicle.order, vehicle.reserved)
    );
  }
}
