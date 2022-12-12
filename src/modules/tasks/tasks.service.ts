import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtConstants } from 'src/shared/constants/jwt-secret';
import { TASKS_ERRORS } from 'src/shared/helpers/responses/errors/task-errors.helpers';
import { USER_ERRORS } from 'src/shared/helpers/responses/errors/user-errors.helpers';
import { TASKS_SUCESSFULL } from 'src/shared/helpers/responses/successfuls/task-successfuls.helpers';
import { In, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { RemoveManyTasksDto } from './dto/remove-many-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    private readonly userService: UsersService,

    private jwtService: JwtService,
  ) { }
  async create(token: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const user_id = await this.decodeTokenToGetUserId(token);
    const user = await this.userService.findOneById(user_id);

    if (!user) {
      throw new NotFoundException(
        `${USER_ERRORS.userDoesntExistWithThisId} ${user_id}`,
      );
    }

    const task = this.taskRepository.create(createTaskDto);

    task.user = user;

    return this.taskRepository.save(task);
  }

  async findAll(token: string): Promise<Task[]> {
    const user_id = await this.decodeTokenToGetUserId(token);

    const tasks = await this.taskRepository.find({
      where: { user: { id: user_id } },
    });

    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException(TASKS_ERRORS.taskDontExist);

    return this.taskRepository.save({ ...task, ...updateTaskDto });
  }

  async remove(id: string): Promise<{ message: string }> {
    const task = await this.findOne(id);

    if (!task) throw new NotFoundException(TASKS_ERRORS.taskDontExist);

    await this.taskRepository.softRemove(task);

    return { message: TASKS_SUCESSFULL.taskRemovedWithSuccessful };
  }

  async removeManyTasks({
    token,
    body,
  }: {
    token: string;
    body: RemoveManyTasksDto;
  }): Promise<{ message: string }> {
    const user_id = await this.decodeTokenToGetUserId(token);

    const tasks = await this.findAllByTaskUserIdAndStatus(user_id, body.status);

    if (!tasks) throw new NotFoundException(TASKS_ERRORS.taskDontExist);

    await this.taskRepository.softRemove(tasks);

    return { message: TASKS_SUCESSFULL.manyTasksRemovedWithSuccessful };
  }

  async findAllByTaskUserIdAndStatus(id: string, status: string) {
    return this.taskRepository.find({ where: { user: { id }, status } });
  }

  async decodeTokenToGetUserId(token): Promise<string> {
    const authorization = token.split(' ')[1];
    const user_id = this.jwtService.verify(authorization, {
      secret: jwtConstants.secret,
    }).id;

    return user_id;
  }
}
