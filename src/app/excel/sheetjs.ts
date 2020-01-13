/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */

/**
 * See GitHub https://github.com/SheetJS/sheetjs for more info.
 *
 * The angular demo is here: https://github.com/SheetJS/sheetjs/tree/master/demos/angular2/src/app
 *
 */

import * as XLSX from 'xlsx';

export type AOA = any[][];


export class SheetJS {
  data: AOA;
  writingOpts: XLSX.WritingOptions = {
    type: 'array', // Output data encoding
    bookSST: false, // Generate Shared String Table?
    bookType: 'xlsx', // File format of generated workbook
    sheet: 'sheet', // Name of Worksheet (for single-sheet formats)
    compression: false, // Use ZIP compression for ZIP-based formats
    ignoreEC: true, // Suppress "number stored as text" errors in generated files?
    Props: null // Override workbook properties on save
  };
  htmlOptions: XLSX.Sheet2HTMLOpts = {
    id: 'sheet', // TABLE element id attribute
    editable: true, // Add contenteditable to every cell?
    header: 'Sheet As HTML Table', // HTML Header
    footer: 'The Sheet\'s Footer' // HTML Footer
  };
  csvOpts: XLSX.Sheet2CSVOpts = {
    FS: ';', // Field Separator ("delimiter")
    RS: '\n', // Record Separator ("row separator")
    strip: true, // Remove trailing field separators in each record?
    blankrows: true, // Include blank lines in the CSV output?
    skipHidden: false // Skip hidden rows and columns in the CSV output?
  };
  jsonOpts: XLSX.Sheet2JSONOpts = {
    // tslint:disable-next-line: quotemark
    header: 'A', // Output format
    range: null, // Override worksheet range
    blankrows: true, // Include or omit blank lines in the output
    defval: 'NO VALUE', // Default value for null/undefined values
    raw: false // if true, return raw data; if false, return formatted text
  };

  fileName = 'SheetJS.xlsx';

  constructor(data: AOA) {
    this.data = data;
  }


  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  open(fileName: string): XLSX.WorkBook {
    const workbook = XLSX.readFile(fileName);
    return workbook;
  }

  workbook2json(workbook: XLSX.WorkBook): string {
    const result = {};
    workbook.SheetNames.forEach((sheetName) => {
      const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
      if (roa.length) {
        result[sheetName] = roa;
      }
    });
    return JSON.stringify(result, null, 2);
  }

  workbook2csv(workbook: XLSX.WorkBook): string {
    const result = [];
    workbook.SheetNames.forEach((sheetName) => {
      const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
      if (csv.length) {
        result.push('SHEET: ' + sheetName);
        result.push('');
        result.push(csv);
      }
    });
    return result.join('\n');
  }

  workbook2formulae(workbook: XLSX.WorkBook): string {
    const result = [];
    workbook.SheetNames.forEach((sheetName) => {
      const formulae = XLSX.utils.sheet_to_formulae(workbook.Sheets[sheetName]);
      if (formulae.length) {
        result.push('SHEET: ' + sheetName);
        result.push('');
        result.push(formulae.join('\n'));
      }
    });
    return result.join('\n');
  }

  workbook2html(workbook: XLSX.WorkBook): string {
    const HTMLOUT = document.getElementById('htmlout');
    HTMLOUT.innerHTML = '';
    workbook.SheetNames.forEach((sheetName) => {
      const htmlstr = XLSX.write(workbook, { sheet: sheetName, type: 'string', bookType: 'html' });
      HTMLOUT.innerHTML += htmlstr;
    });
    return '';
  }

}
