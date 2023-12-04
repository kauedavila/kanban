import { RefetchTaskListProps, TaskListProps } from "./taskLystTypes";

export type TaskProps = {
  task: {
    id: string;
    attributes: {
      Name: string;
    };
  };
} & RefetchTaskListProps &
  Pick<TaskListProps, "taskListID">;
