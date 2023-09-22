import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType } from 'src/data';
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from 'src/dtos/report.dto';
import { AppService } from './app.service'

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appService: AppService
  ){}

  @Get('')
  getAllIncomeReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] { //6.2
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType)
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string, 
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDto { //6.2
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id)
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto { //6.2
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportResponseDto { //6.2
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}