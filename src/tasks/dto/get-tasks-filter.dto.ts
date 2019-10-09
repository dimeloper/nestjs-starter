import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  search: string;
  status: TaskStatus;
}
