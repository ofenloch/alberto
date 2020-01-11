import { Component, OnInit } from '@angular/core';

import { Cell } from '../excel/cell';
import { MessageService } from '../message.service';
import { Row } from '../excel/row';
import { Sheet } from '../excel/sheet';
import { SheetJS, AOA } from '../excel/sheetjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {

  sheet: Sheet;
  rowIndices: Array<number>;
  cellIndices: Array<number>;
  private sheetJS: SheetJS;
  data: AOA;

  constructor(private logger: MessageService) {
    this.logger.debug('InputComponent constructor');
  }

  get NRows(): number {
    return this.sheet.NRows;
  }
  get NColumns(): number {
    return this.sheet.NMaxCells;
  }

  get Rows(): Array<Row> {
    return this.sheet.Rows;
  }

  Row(index: number): Row {
    return this.sheet.Row(index);
  }

  Cell(rowIdx: number, cellIdx: number): Cell {
    return this.sheet.Cell(rowIdx, cellIdx);
  }

  ngOnInit() {
    this.logger.debug('InputComponent ngOnInit');
    this.sheet = new Sheet(7, 5);
    this.rowIndices = new Array<number>(this.sheet.NRows);
    for (let i = 0; i < this.sheet.NRows; i++) {
      this.rowIndices[i] = i;
    }
    this.cellIndices = new Array<number>(this.sheet.NMaxCells);
    for (let j = 0; j < this.sheet.NMaxCells; j++) {
      this.cellIndices[j] = j;
    }
    this.sheet2AOA();
  }

  private sheet2AOA(): void {
    this.logger.debug('InputComponent sheet2AOA');
    this.data = new Array<Array<any>>();
    for (let i = 0; i < this.sheet.NRows; i++) {
      const row = this.Row(i);
      const rowArray = new Array<any>();
      for (let j = 0; j < this.sheet.NMaxCells; j++) {
        rowArray.push(row.Cell(j).Content);
      }
      this.data.push(rowArray);
    }
  }

  export(): void {
    this.logger.debug('InputComponent export');
    this.sheetJS.export();
  }

} // export class InputComponent implements OnInit
