import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class RemoveManyTasksDto {
  @ApiProperty({
    description: "Task's status",
    example: 'PROGRESS',
  })
  @IsString()
  @IsIn(['PROGRESS', 'FINISHED'])
  @IsNotEmpty()
  status: string;
}
