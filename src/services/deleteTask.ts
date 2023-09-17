import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
  mutation DeleteTaskt($id: ID!) {
    deleteTask(id: $id) {
      data {
        id
      }
    }
  }
`;
