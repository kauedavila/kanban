import { ApolloQueryResult, OperationVariables } from "@apollo/client";

export type TaskListProps = {
  taskListID: string;
  taskListName: string;
  tasks?: {
    id: string;
    attributes: {
      Name: string;
    };
  }[];
} & RefetchTaskListProps;

export type TaskListMenuProps = {
  taskListMenuOpen: boolean;
  setTaskListMenuOpen: (taskListMenuOpen: boolean) => void;
} & RefetchTaskListProps &
  Pick<TaskListProps, "taskListID">;

export type AddTaskProps = {
  addingTask: boolean;
  setAddingTask: (value: boolean) => void;
} & TaskListProps &
  RefetchTaskListProps;

export type RefetchTaskListProps = {
  refetchTaskList?: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
};
