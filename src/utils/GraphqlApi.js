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
        id
        name
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;