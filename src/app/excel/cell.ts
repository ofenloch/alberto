export class Cell {
  private content: string;

  constructor(content?: string) {
    if (content != null) {
      this.content = content;
    } else {
      this.content = '';
    }

  }

  get Content(): string {
    return this.content;
  }

  set Content(content: string) {
    this.content = content;
  }

} // export class Cell
