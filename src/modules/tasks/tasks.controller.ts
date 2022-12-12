import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RemoveManyTasksDto } from './dto/remove-many-task.dto';

@ApiTags('Tasks')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBearerAuth('jwt-token')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiOperation({
    summary: 'Create Task',
    description: 'Create Task endpoint. Create a new Task',
  })
  @ApiCreatedResponse({ description: 'Created', type: Task })
  @Post()
  create(@Request() req, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(req.headers.authorization, createTaskDto);
  }

  @ApiOperation({
    summary: 'findAll task',
    description: 'FindAll task endpoint. List all tasks on the system.',
  })
  @ApiOkResponse({ description: 'Found', type: Task })
  @Get()
  findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.headers.authorization);
  }

  @ApiOperation({
    summary: 'findOne task',
    description: 'FindOne task endpoint. List one tasks on the system.',
  })
  @ApiOkResponse({ description: 'Found', type: Task })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({
    summary: 'update task',
    description: 'Update task endpoint. update one task on the system.',
  })
  @ApiOkResponse({ description: 'Updated', type: Task })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({
    summary: 'delete many task by id and status',
    description: 'Delete task endpoint. delete one task on the system.',
  })
  @ApiOkResponse({ description: 'Deleted' })
  @Delete('deleteMany')
  removeManyTasks(
    @Request() req,
    @Body() body: RemoveManyTasksDto,
  ): Promise<{ message: string }> {
    return this.tasksService.removeManyTasks({
      token: req.headers.authorization,
      body: body,
    });
  }

  @ApiOperation({
    summary: 'delete task',
    description: 'Delete task endpoint. delete one task on the system.',
  })
  @ApiOkResponse({ description: 'Deleted' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.remove(id);
  }
}
