import { gql } from "@apollo/client";

export const getProducts = gql`
  query Query {
    categories {
      name
      products {
        name
      }
    }
  }
`;
