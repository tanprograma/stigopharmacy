import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Outlet } from '../outlet';
import { Commodity } from '../commodity';
import { Prescription } from '../prescription';
import { Inventory } from '../inventory';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}
  // createDb() {
  //   const units = [
  //     { id: 1, name: 'tablet' },
  //     { id: 2, name: 'strip' },
  //     { id: 3, name: 'capsule' },
  //     { id: 4, name: 'ampoule' },
  //     { id: 5, name: 'bottle' },
  //     { id: 6, name: 'box' },
  //   ];
  //   const prescriptions: Prescription[] = [
  //     {
  //       id: 1,
  //       host: 'mainclinic',
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       host: 'mainclinic',
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       host: 'mainclinic',
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //       ],
  //     },
  //   ];
  //   const requests: Prescription[] = [
  //     {
  //       id: 1,
  //       host: 'mainclinic',
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       host: 'mainclinic',
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 0,
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       host: 'mainclinic',
  //       isIssued: true,
  //       client: 'rightbank',
  //       commodities: [
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //         {
  //           commodity: 'paracetamol 250mg',
  //           unit: 'tablet',
  //           requested: 2000,
  //           issued: 2000,
  //         },
  //       ],
  //     },
  //   ];

  //   const commodities: Commodity[] = [
  //     {
  //       id: 1,
  //       name: 'paracetamol 500mg',

  //       units: [
  //         { name: 'tablet', quantity: 1 },
  //         { name: 'strip', quantity: 10 },
  //         { name: 'box', quantity: 100 },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       name: 'azithromycin 500mg',

  //       units: [
  //         { name: 'tablet', quantity: 1 },
  //         { name: 'strip', quantity: 10 },
  //         { name: 'box', quantity: 100 },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       name: 'misoprostol 200mcg',

  //       units: [
  //         { name: 'tablet', quantity: 1 },
  //         { name: 'strip', quantity: 10 },
  //         { name: 'box', quantity: 100 },
  //       ],
  //     },
  //     {
  //       id: 4,
  //       name: 'relcer gel 200ml',

  //       units: [
  //         { name: 'bottle', quantity: 1 },
  //         { name: 'box', quantity: 24 },
  //       ],
  //     },
  //     // { id: 2, name: 'azithromycin 50Omg' },
  //     // { id: 3, name: 'metronidazole 200mg' },
  //     // { id: 4, name: 'misoprostol 200mcg' },
  //   ];
  //   const inventories: Inventory[] = [
  //     {
  //       commodity: 1,
  //       id: 1,
  //       beginning: 567470,
  //       outlet: 1,
  //       dispensed: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       received: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       issued: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //     },
  //     {
  //       commodity: 2,
  //       id: 2,
  //       beginning: 567470,
  //       outlet: 2,
  //       dispensed: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       received: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       issued: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //     },
  //     {
  //       commodity: 3,
  //       id: 3,
  //       beginning: 567470,
  //       outlet: 3,
  //       dispensed: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       received: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       issued: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //     },
  //     {
  //       commodity: 4,
  //       id: 4,
  //       beginning: 567470,
  //       outlet: 4,
  //       dispensed: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       received: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       issued: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //     },
  //     {
  //       commodity: 5,
  //       id: 5,
  //       beginning: 567470,
  //       outlet: 5,
  //       dispensed: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       received: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //       issued: [
  //         { transaction: 1, date: 1681961496193, quantity: 300 },
  //         { transaction: 2, date: 1681961496193, quantity: 400 },
  //         { transaction: 3, date: 1681961496193, quantity: 700 },
  //         { transaction: 4, date: 1681961496193, quantity: 600 },
  //       ],
  //     },
  //   ];
  //   const outlets: Outlet[] = [
  //     { id: 1, name: 'mainclinic', isWarehouse: false },
  //     { id: 2, name: 'rightbank', isWarehouse: false },
  //     { id: 3, name: 'powerhouse', isWarehouse: false },
  //     { id: 4, name: 'saddledam', isWarehouse: false },
  //     { id: 4, name: 'material control', isWarehouse: true },
  //   ];
  //   return { commodities, inventories, outlets, requests, prescriptions };
  // }
  genId() {}
}
