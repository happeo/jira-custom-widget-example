import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import styled from "styled-components";

import Jira from "./components/Jira/Jira";
import { Advertisement } from "./components/Advertisement";
import { Setup } from "./components/Setup";
import { ToastContainer } from "@happeouikit/toast";
import { Loader } from "@happeouikit/loaders";
import { TextEpsilon } from "@happeouikit/typography";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const windowData = window.name ? JSON.parse(window.name) : {};

    if (!windowData.token) return;

    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: windowData.token }),
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });

    function listener(event) {
      const { data } = event;

      if (!data._h || typeof data._h !== "object") {
        // This is not coming from Happeo
        return;
      }

      if (data._h.userinfo) {
        // Happeo sent us userinfo, we should do stuff with it

        console.log("Content from postMessage", data._h);
      }
    }

    // Start listening to messages
    window.addEventListener("message", listener);

    // Post to Happeo your ID, the scope that you need and optionally you can call "resize" to set the parent iframe height
    window.parent.postMessage(
      { _c: { scopes: ["userinfo.email", "userinfo.id", "organisation.id"] } },
      "*",
    );
  }, []);

  if (loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <TextEpsilon>Unauthorized</TextEpsilon>
      </Container>
    );
  }

  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/issues">
            <Jira />
          </Route>
          <Route path="/setup">
            <Setup />
          </Route>
          <Route path="/">
            <Advertisement />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default App;
