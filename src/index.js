import React from "react";
import ReactDOM from "react-dom";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";

class CustomGraphiQL extends React.Component {
  state = {
    fetcher: this.graphQLFetcher(localStorage.getItem("endpoint")),
    endpoint: localStorage.getItem("endpoint") || ""
  };

  graphQLFetcher(endpoint) {
    return graphQLParams => {
      if (!endpoint) {
        return Promise.resolve("Specify an Endpoint");
      } else {
        return fetch(endpoint, {
          method: "post",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(graphQLParams)
        }).then(response => response.json());
      }
    };
  }

  handleChangeEndpoint = event => {
    this.setState({ endpoint: event.target.value });
  };

  handleSetEndpoint = () => {
    this.setState(
      prevState => ({ fetcher: this.graphQLFetcher(prevState.endpoint) }),
      () => localStorage.setItem("endpoint", this.state.endpoint)
    );
  };

  render() {
    return (
      <GraphiQL
        ref={c => {
          this.graphiql = c;
        }}
        {...this.state}
      >
        <GraphiQL.Logo />

        <GraphiQL.Toolbar>
          <GraphiQL.Button
            onClick={() => this.graphiql.handlePrettifyQuery()}
            title="Prettify Query"
            label="Prettify"
          />
          <GraphiQL.Button
            onClick={() => this.graphiql.handleToggleHistory()}
            title="Show History"
            label="History"
          />
          <input
            type="text"
            style={{ width: "400px", margin: "0 5px", padding: "0 11px" }}
            placeholder="Endpoint"
            value={this.state.endpoint}
            onChange={this.handleChangeEndpoint}
          />
          <GraphiQL.Button
            label="Set Endpoint"
            title="Set GraphQL Endpoint"
            onClick={this.handleSetEndpoint}
          />

        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
}

ReactDOM.render(<CustomGraphiQL />, document.getElementById("graphiql"));
