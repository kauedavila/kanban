import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $publishedAt: DateTime!) {
    createTask(data: { Name: $name, publishedAt: $publishedAt }) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
