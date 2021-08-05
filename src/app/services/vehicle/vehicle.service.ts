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
  constructor(private vin: string, private order: string) {}

  async loadData(): Promise<[EtisInfo, TrackerInfo]> {
    return Promise.all([this.loadEtisData(), this.loadTrackerData()]);
  }

  async loadEtisData() {
    return fetch(`${environment.api}/vehicle/etis?vin=${this.vin}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.error(res.error);
          throw res.error;
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
        if (res.error) {
          console.error(res.error);
          throw res.error;
        }
        return res.data;
      });
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor() {}

  get vehicles() {
    return environment.vehicles.map(
      (vehicle) => new Vehicle(vehicle.vin, vehicle.order)
    );
  }
}
