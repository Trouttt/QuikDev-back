import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  @ApiProperty({
    description: "User's id",
    example: 'cd614445-625b-4bd1-bdc7-ab605fb4b127',
  })
  @IsUUID()
  @IsOptional()
  @IsNotEmpty()
  user_id?: string;

  @ApiPropertyOptional({
    description: 'Task to be done',
    example: 'Fazer 30 minutos de atividade física',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    description: 'Status da tarefa',
    example: 'FINISHED',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(['PROGRESS', 'FINISHED'])
  status?: string;
}
