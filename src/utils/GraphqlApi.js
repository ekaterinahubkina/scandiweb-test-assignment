import { gql } from "@apollo/client";

export const getProducts = gql`
  query Query {
    currencies {
      label
      symbol
    }
    categories {
      name
      products {
        name
      }
    }
  }
`;