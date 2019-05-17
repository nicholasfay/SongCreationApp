import gql from "graphql-tag";

export default gql`
  query listSongs {
    listSongs {
      items {
        title
        id
      }
    }
  }
`;
