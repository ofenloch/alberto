import { Cell } from './cell';

export class Row {
  private cells: Array<Cell>;
  private nCells: number;

  constructor() {
    this.cells = new Array<Cell>();
    this.nCells = 0;
  }

  public AddCell(cell: Cell) {
    this.cells.push(cell);
    this.nCells++;
  }

  get NCells(): number {
    return this.nCells;
  }

  get Cells(): Array<Cell> {
    return this.Cells;
  }

  Cell(index: number): Cell {
    if (index >= 0 && index < this.nCells) {
      return this.cells[index];
    }
    return null;
  }

} // export class Row
