import { gql } from "@apollo/client";

export const DELETE_TASK_LIST = gql`
  mutation DeleteTaskList($id: ID!) {
    deleteTaskList(id: $id) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
