import { gql } from "@apollo/client";

export const GET_TASK_LISTS = gql`
  query GetTaskLists {
    taskLists {
      data {
        id
        attributes {
          Name
          tasks {
            data {
              id
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;
