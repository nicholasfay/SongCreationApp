import gql from "graphql-tag";

export default gql`
  mutation createSong($title: String!, $id: ID!) {
    createSong(input: { title: $title, id: $id }) {
      id
      title
    }
  }
`;
