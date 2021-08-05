import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  ElectronicControlUnit,
  EtisInfo,
  TrackerInfo,
  Vehicle,
} from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-section',
  templateUrl: './vehicle-section.component.html',
  styleUrls: ['./vehicle-section.component.scss'],
})
export class VehicleSectionComponent implements OnInit {
  @Input('vehicle') vehicle!: Vehicle;

  loading: boolean = true;
  error?: any;

  trackerData?: TrackerInfo;
  etisData?: EtisInfo;

  etisDataSource: ElectronicControlUnit[] = [];
  etisDisplayedColumns = [
    'acronym',
    'nodeId',
    // 'description',
    'assemblyPartNo',
    'derivedAssemblyPartNo',
    'softwarePartNo',
    'hardwarePartNo',
    'lastChecked',
  ];

  trackerDataSource: {
    receiptDate: Date | null;
    releaseDate: Date | null;
    etaStartDate: Date | null;
    etaEndDate: Date | null;
    productionDate: Date | null;
    shipmentDate: Date | null;
    shippingDays: number | null;
  }[] = [
    {
      receiptDate: null,
      releaseDate: null,
      etaStartDate: null,
      etaEndDate: null,
      productionDate: null,
      shipmentDate: null,
      shippingDays: null,
    },
  ];

  trackerDisplayedColumns = [
    'receiptDate',
    'etaStartDate',
    'etaEndDate',
    'productionDate',
    'releaseDate',
    'shipmentDate',
    'shippingDays',
  ];

  moment = moment;

  carouselSize = {
    width: 800,
    height: 400,
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.vehicle
      .loadData()
      .then((res) => {
        this.etisData = res[0];
        this.trackerData = res[1];

        this.etisDataSource = this.electronicControlUnits;
        this.trackerDataSource = this.trackerDates;
      })
      .catch((error) => (this.error = error))
      .finally(() => (this.loading = false));

    this.breakpointObserver.observe('(min-width: 1251px)').subscribe((data) => {
      if (!data.matches) return;

      this.trackerDisplayedColumns = [
        'receiptDate',
        'etaStartDate',
        'etaEndDate',
        'productionDate',
        'releaseDate',
        'shipmentDate',
        'shippingDays',
      ];

      this.etisDisplayedColumns = [
        'acronym',
        'nodeId',
        // 'description',
        'assemblyPartNo',
        'derivedAssemblyPartNo',
        'softwarePartNo',
        'hardwarePartNo',
        'lastChecked',
      ];

      this.carouselSize = {
        width: 800,
        height: 400,
      };
    });

    this.breakpointObserver
      .observe('(max-width: 1250px) and (min-width: 1151px)')
      .subscribe((data) => {
        if (!data.matches) return;

        this.trackerDisplayedColumns = [
          'receiptDate',
          'etaStartDate',
          'etaEndDate',
          'productionDate',
          'releaseDate',
          'shipmentDate',
          'shippingDays',
        ];

        this.etisDisplayedColumns = [
          'acronym',
          'nodeId',
          // 'description',
          'assemblyPartNo',
          'derivedAssemblyPartNo',
          'softwarePartNo',
          'hardwarePartNo',
          'lastChecked',
        ];

        this.carouselSize = {
          width: 700,
          height: 350,
        };
      });

    this.breakpointObserver
      .observe('(max-width: 1150px) and (min-width: 651px)')
      .subscribe((data) => {
        if (!data.matches) return;

        this.trackerDisplayedColumns = [
          // 'receiptDate',
          'etaStartDate',
          'etaEndDate',
          'productionDate',
          'releaseDate',
          'shipmentDate',
          'shippingDays',
        ];

        this.etisDisplayedColumns = [
          'acronym',
          'nodeId',
          // 'description',
          // 'assemblyPartNo',
          // 'derivedAssemblyPartNo',
          // 'softwarePartNo',
          // 'hardwarePartNo',
          'lastChecked',
        ];

        this.carouselSize = {
          width: 600,
          height: 300,
        };
      });

    this.breakpointObserver.observe('(max-width: 650px)').subscribe((data) => {
      if (!data.matches) return;

      this.trackerDisplayedColumns = [
        'receiptDate',
        'etaStartDate',
        'etaEndDate',
        'productionDate',
        'releaseDate',
        'shipmentDate',
        'shippingDays',
      ];

      this.etisDisplayedColumns = [
        'acronym',
        'nodeId',
        // 'description',
        // 'assemblyPartNo',
        // 'derivedAssemblyPartNo',
        // 'softwarePartNo',
        // 'hardwarePartNo',
        'lastChecked',
      ];

      this.carouselSize = {
        width: 350,
        height: 175,
      };
    });
  }

  get name() {
    if (this.trackerData)
      return `${this.trackerData.year} ${this.trackerData.make} ${this.trackerData.model}`;

    return null;
  }

  get trim() {
    if (this.trackerData) return this.trackerData.trim;

    return null;
  }

  get windowSticker() {
    if (this.trackerData)
      return `https://www.windowsticker.forddirect.com/windowsticker.pdf?vin=${this.trackerData.vin}`;

    return null;
  }

  get images() {
    if (this.trackerData) {
      if (this.vehicle.type == 'sport')
        return [
          ...Array.from({
            length: Number(this.trackerData.attributes.digExteriorAngles),
          }).map(
            (_, i) =>
              `https://build.ford.com/dig/Ford/Bronco%20Sport/2021/HD-TILE/${
                this.trackerData?.custOrderImgToken
              }/EXT/${i + 1}/vehicle.png`
          ),
          ...Array.from({
            length: Number(this.trackerData.attributes.digInteriorAngles),
          }).map(
            (_, i) =>
              `https://build.ford.com/dig/Ford/Bronco%20Sport/2021/HD-TILE/${
                this.trackerData?.custOrderImgToken
              }/INT/${i + 1}/vehicle.png`
          ),
        ];
      if (this.vehicle.type == 'bronco')
        return [
          ...Array.from({
            length: Number(this.trackerData.attributes.digExteriorAngles),
          }).map(
            (_, i) =>
              `https://build.ford.com/dig/Ford/Bronco/2021/HD-TILE/${
                this.trackerData?.custOrderImgToken
              }/EXT/${i + 1}/vehicle.png`
          ),
          ...Array.from({
            length: Number(this.trackerData.attributes.digInteriorAngles),
          }).map(
            (_, i) =>
              `https://build.ford.com/dig/Ford/Bronco/2021/HD-TILE/${
                this.trackerData?.custOrderImgToken
              }/INT/${i + 1}/vehicle.png`
          ),
        ];
    }

    return [];
  }

  get status() {
    if (this.trackerData) return this.trackerData.primaryStatus;

    return null;
  }

  get electronicControlUnits() {
    if (this.etisData) return this.etisData.electronicControlUnits;

    return [];
  }

  convertToDate(date: string, format = 'YYYY-MM-DD'): Date | null {
    if (date == '01-01-1970') return null;
    return new Date(moment(date, format).format());
  }

  get trackerDates() {
    if (this.trackerData)
      return [
        {
          receiptDate: this.trackerData.receiptDate
            ? new Date(this.trackerData.receiptDate)
            : null,
          releaseDate: this.trackerData.releaseDate
            ? new Date(this.trackerData.releaseDate)
            : null,
          etaStartDate: this.trackerData.etaStartDate
            ? new Date(this.trackerData.etaStartDate)
            : null,
          etaEndDate: this.trackerData.etaEndDate
            ? new Date(this.trackerData.etaEndDate)
            : null,
          productionDate: this.trackerData.productionDate
            ? new Date(this.trackerData.productionDate)
            : null,
          shipmentDate: this.trackerData.shipmentDate
            ? new Date(this.trackerData.shipmentDate)
            : null,
          shippingDays: Number(this.trackerData.transitDate) || null,
        },
      ];

    return [
      {
        receiptDate: null,
        releaseDate: null,
        etaStartDate: null,
        etaEndDate: null,
        productionDate: null,
        shipmentDate: null,
        shippingDays: null,
      },
    ];
  }

  get vin() {
    if (this.trackerData) return this.trackerData.vin;

    return '';
  }
  get order() {
    if (this.trackerData) return this.trackerData.id;

    return '';
  }
  get exteriorColorName() {
    if (this.trackerData)
      return this.trackerData.custOrderPartsInfo.Exterior.find(
        (data) => data.name == 'Paint Type'
      )?.parts[0].attributes.BP2_PartDescriptions_Paint_Type;

    return '';
  }

  get exteriorColor() {
    if (this.trackerData)
      return this.trackerData.custOrderPartsInfo.Exterior.find(
        (data) => data.name == 'Paint Type'
      )
        ?.parts[0].attributes.BP2_PartColors_Paint_Type.split('|')[0]
        .slice(2);

    return '';
  }

  get interiorColorName() {
    if (this.trackerData)
      return this.trackerData.custOrderPartsInfo.Interior.find(
        (data) => data.name == 'Interior Trim Colour'
      )?.parts[0].attributes.BP2_PartDescriptions_Interior_Trim_Colour;

    return '';
  }

  get interiorColor() {
    if (this.trackerData)
      return this.trackerData.custOrderPartsInfo.Interior.find(
        (data) => data.name == 'Interior Trim Colour'
      )
        ?.parts[0].attributes.BP2_PartColors_Interior_Trim_Colour.split('|')[0]
        .slice(2);

    return '';
  }

  get reserved() {
    return this.vehicle.reserved;
  }
}
