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
        brand
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

export const getProduct = gql`
  query Query($id: String!) {
    product(id: $id) {
      name
      brand
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
      attributes {
        name
        type
        items {
          id
          displayValue
        }
      }
      description
    }
  }
`;
