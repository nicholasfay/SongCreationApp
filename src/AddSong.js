import React from "react";
import { css } from "glamor";
import { graphql } from "react-apollo";

import CreateSong from "./mutations/CreateSong";
import ListSongs from "./queries/ListSongs";

class AddSong extends React.Component {
  state = {
    title: "",
    id: ""
  };
  onChange = (key, value) => {
    this.setState({ [key]: value });
  };
  addSong = () => {
    const { title, id } = this.state;
    this.props.onAdd({
      title,
      id
    });
    this.setState({
      title: "",
      id: ""
    });
  };
  render() {
    return (
      <div {...css(styles.container)}>
        <h2>Create Song</h2>
        <input
          value={this.state.title}
          onChange={evt => this.onChange("title", evt.target.value)}
          placeholder="Song title"
          {...css(styles.input)}
        />
        <input
          value={this.state.id}
          onChange={evt => this.onChange("id", evt.target.value)}
          placeholder="Song id"
          {...css(styles.input)}
        />

        <div {...css(styles.submitButton)} onClick={this.addSong}>
          <p>Add Song</p>
        </div>
      </div>
    );
  }
}

export default graphql(CreateSong, {
  props: props => ({
    onAdd: song =>
      props.mutate({
        variables: song,
        optimisticResponse: {
          __typename: "Mutation",
          createSong: { ...song, __typename: "Song" }
        },
        update: (proxy, { data: { createSong } }) => {
          const data = proxy.readQuery({ query: ListSongs });
          data.listSongs.items.push(createSong);
          proxy.writeQuery({ query: ListSongs, data });
        }
      })
  })
})(AddSong);

const styles = {
  button: {
    border: "none",
    background: "rgba(0, 0, 0, .1)",
    width: 250,
    height: 50,
    cursor: "pointer",
    margin: "15px 0px"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: "left"
  },
  input: {
    outline: "none",
    border: "none",
    borderBottom: "2px solid #1CAFE9",
    height: "44px",
    fontSize: "18px"
  },
  textarea: {
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "18px"
  },
  submitButton: {
    backgroundColor: "#1CAFE9",
    padding: "8px 30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.85,
    cursor: "pointer",
    ":hover": {
      opacity: 1
    }
  }
};
