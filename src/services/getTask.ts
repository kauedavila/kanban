import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      data {
        id
        attributes {
          Name
          tasksList {
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
