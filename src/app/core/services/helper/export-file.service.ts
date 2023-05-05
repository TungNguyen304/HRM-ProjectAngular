import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { IEmployeeResponse } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExportFileService {
  private EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private EXCEL_EXTENSION = '.xlsx';

  public exportAsExcelFile(dataList: IEmployeeResponse[], fileName: string) {
    const subTable: any = {};
    dataList.forEach((data: IEmployeeResponse) => {
      Object.keys(data).forEach((keyOfData) => {
        if (
          data[keyOfData as keyof typeof data] instanceof Array ||
          data[keyOfData as keyof typeof data] instanceof Object
        ) {
          if (keyOfData === 'social_network') {
            data[keyOfData] = data[keyOfData].map((item: any) => {
              return JSON.parse(item);
            });
          }
          if (Object.keys(subTable).length > 0) {
            Object.keys(subTable).every((keyOfSubTable: any) => {
              if (keyOfSubTable === keyOfData) {
                subTable[keyOfData] = [
                  ...subTable[keyOfData],
                  data[keyOfData as keyof typeof data],
                ];
                return false;
              } else {
                subTable[keyOfData] = [data[keyOfData as keyof typeof data]];
              }
              return true;
            });
          } else {
            subTable[keyOfData] = [data[keyOfData as keyof typeof data]];
          }

          delete data[keyOfData as keyof typeof data];
        }
      });
    });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataList);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    Object.keys(subTable).forEach((key) => {
      if (
        key === 'social_network' ||
        key === 'update_asset_history_collection' ||
        key === 'user_working_histories' ||
        key === 'asset_using_collection'
      ) {
        const ws = XLSX.utils.json_to_sheet(subTable[key].flat());
        XLSX.utils.book_append_sheet(workbook, ws, key);
      } else {
        const ws = XLSX.utils.json_to_sheet(subTable[key]);
        XLSX.utils.book_append_sheet(workbook, ws, key);
      }
    });

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION
    );
  }
}
