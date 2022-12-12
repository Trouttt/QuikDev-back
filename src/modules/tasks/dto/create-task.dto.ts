import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task to be done',
    example: 'Fazer 30 minutos de atividade física',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Status da tarefa',
    example: 'FINISHED',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(['PROGRESS', 'FINISHED'])
  status = 'PROGRESS';
}
