import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from 'src/dtos/report.dto'; //6.2

interface Report { amount: number; source: string }

interface UpdateReport { amount?: number; source?: string }


@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[]{ //6.2
    return data.report
    .filter((report) => report.type === type)
    .map((report) => new ReportResponseDto(report)); //6.2
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {  //6.2
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportResponseDto(report); //6.2
  }

  createReport(type: ReportType, { amount, source }: Report): ReportResponseDto{
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);  //6.2
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {  //6.2
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]); //6.2
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1)

    return;
  }
}
