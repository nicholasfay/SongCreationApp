import React from "react";

import { css } from "glamor";
import { graphql } from "react-apollo";
import ListSongs from "./queries/ListSongs";
import NewSongSubscription from "./subscriptions/NewSongSubscription";

class Songs extends React.Component {
  componentWillMount() {
    this.props.subscribeToNewSongs();
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h1>Songs</h1>
        {this.props.songs.map((r, i) => (
          <div {...css(styles.song)} key={i}>
            <p {...css(styles.title)}>Song title: {r.title}</p>
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(0, 0, 0, .5)"
  },
  song: {
    boxShadow: "2px 2px 5px rgba(0, 0, 0, .2)",
    marginBottom: 7,
    padding: 14,
    border: "1px solid #ededed"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: "left"
  }
};

export default graphql(ListSongs, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: props => ({
    songs: props.data.listSongs ? props.data.listSongs.items : [],
    subscribeToNewSongs: params => {
      props.data.subscribeToMore({
        document: NewSongSubscription,
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: { onCreateSong }
            }
          }
        ) => {
          return {
            ...prev,
            listSongs: {
              __typename: "SongConnection",
              items: [
                onCreateSong,
                ...prev.listSongs.items.filter(
                  song => song.id !== onCreateSong.id
                )
              ]
            }
          };
        }
      });
    }
  })
})(Songs);
