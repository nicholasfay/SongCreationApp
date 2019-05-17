import gql from "graphql-tag";

export default gql`
  subscription NewSongSub {
    onCreateSong {
      title
      id
    }
  }
`;
