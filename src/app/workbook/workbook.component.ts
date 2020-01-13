import { Component, OnInit } from '@angular/core';
import { SheetJS, AOA } from '../excel/sheetjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.css']
})
export class WorkbookComponent implements OnInit {

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';

  fileToUpload: File = null;
  rABS: any = null;
  domrabs: any = null;
  sheetJS: SheetJS = null;
  workbook: XLSX.WorkBook = null;
  format = 'CSV';
  wbText = '';
  wbHtml = '';

  constructor() {

  }

  ngOnInit() {

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
      this.workbook = XLSX.read(bstr, { type: 'binary' });
      /* grab first sheet */
      const wsname: string = this.workbook.SheetNames[0];
      const ws: XLSX.WorkSheet = this.workbook.Sheets[wsname];
      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.sheetJS = new SheetJS(this.data);
      this.processWorkbook();
    }; // reader.onload = (e: any) => {
    reader.readAsBinaryString(target.files[0]);
  } // onFileChange(evt: any)

  processWorkbook(): void {
    console.debug('processWorkbook: format is \'' + this.format + '\'');
    this.wbText = '';
    this.wbHtml = '';
    if (this.format === 'CSV') {
      this.wbText = this.sheetJS.workbook2csv(this.workbook);
    } else if (this.format === 'JSON') {
      this.wbText = this.sheetJS.workbook2json(this.workbook);
    } else if ( this.format === 'FORMULAE') {
      this.wbText = this.sheetJS.workbook2formulae(this.workbook);
    } else if (this.format === 'HTML') {
      this.wbHtml = this.sheetJS.workbook2html(this.workbook);
    }
  } // processWorkbook(): void

  saveAsXLSX(fileName: string): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, fileName);
  } // saveAsXLSX(fileName: string): void

  saveAsCSV(fileName: string): void {
    XLSX.writeFile(this.workbook, fileName + '.csv', { bookType: 'csv'});
  } // saveAsCSV(fileName: string): void

  saveAsJSON(fileName: string): void {

  } // saveAsJSON(fileName: string): void

  saveAsHTML(fileName: string): void {
    XLSX.writeFile(this.workbook, fileName + '.html', { bookType: 'html'});
  } // saveAsHTML(fileName: string): void

  saveAsFORMULAE(fileName: string): void {
  } // saveAsFORMULAE(fileName: string): void


}
