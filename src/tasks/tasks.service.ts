import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => found.id !== task.id);
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (search) {
      tasks = this.tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      tasks = this.tasks.filter(task => task.status === status);
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => id === task.id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return found;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);

    task.status = status;
    return task;
  }
}
