import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'createdAt'})  //7.1
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude() //7.1
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType;


  constructor (partial: Partial<ReportResponseDto>){
    Object.assign(this, partial);
  }
}