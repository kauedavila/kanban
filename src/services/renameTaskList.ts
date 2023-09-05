import { gql } from "@apollo/client";

export const RENAME_TASK_LIST = gql`
  mutation UpdateTaskList($id: ID!, $name: String!) {
    updateTaskList(id: $id, data: { Name: $name }) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
