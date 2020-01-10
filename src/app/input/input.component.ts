import { Component, OnInit } from '@angular/core';

import { Cell } from '../excel/cell';
import { Row } from '../excel/row';
import { Sheet } from '../excel/sheet';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {

  sheet: Sheet;
  rowIndices: Array<number>;
  cellIndices: Array<number>;

  constructor() {
  }

  get NRows(): number {
    return this.sheet.NRows;
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
    this.sheet = new Sheet(5, 8);
    this.rowIndices = new Array<number>(this.sheet.NRows);
    for (let i = 0; i < this.sheet.NRows; i++) {
      this.rowIndices[i] = i;
    }
    this.cellIndices = new Array<number>(this.sheet.NMaxCells);
    for (let j = 0; j < this.sheet.NMaxCells; j++) {
      this.cellIndices[j] = j;
    }
  }

} // export class InputComponent implements OnInit
