import { Cell } from './cell';
import { Row } from './row';

export class Sheet {
  private rows: Array<Row>;
  private nRows: number;
  private nMaxCells: number;

  constructor(rows?: number, cells?: number) {
    this.rows = new Array<Row>();
    this.nRows = 0;
    this.nMaxCells = 0;

    if (rows > 0) {
      let cellsPerRow = 10;
      if (cells > 0) {
        cellsPerRow = cells;
      }
      for (let i = 0; i < rows; i++) {
        const newRow = new Row();
        for (let j = 0; j < cellsPerRow; j++) {
          const newCell = new Cell(' cell ' + i + ' ' + j);
          newRow.AddCell(newCell);
        } // for (let j = 0; j < cellsPerRow; j++)
        this.AddRow(newRow);
      } // for (let i = 0; i < rows; i++)
    } // if (rows > 0)
  } // constructor(rows?: number, cells?: number)

  public AddRow(row: Row) {
    this.rows.push(row);
    this.nRows++;
    const nCells = row.NCells;
    if (nCells > this.nMaxCells) {
      this.nMaxCells = nCells;
    }
  }

  get NRows(): number {
    return this.nRows;
  }

  get NMaxCells(): number {
    return this.nMaxCells;
  }

  get Rows(): Array<Row> {
    return this.rows;
  }

  public Row(index: number): Row {
    if (index >= 0 && index < this.nRows) {
      return this.rows[index];
    }
    return null;
  }

  public Cell(rowIdx: number, cellIdx: number): Cell {
    if (rowIdx >= 0 && rowIdx < this.nRows) {
      return this.rows[rowIdx].Cell(cellIdx);
    }
    return null;
  }

} // export class Sheet
