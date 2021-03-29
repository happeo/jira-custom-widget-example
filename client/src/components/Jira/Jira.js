import React, { useEffect, useRef, useState } from "react";

import { Ul } from "@happeouikit/list";
import { TextEpsilon } from "@happeouikit/typography";
import { Loader } from "@happeouikit/loaders";
import styled from "styled-components";
import NoResults from "../Shared/NoResults";
import JiraListItem from "./JiraListItem";
import { padding200, padding300 } from "@happeouikit/layout";
import { Link } from "react-router-dom";

const Jira = ({ userEmail }) => {
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/issues`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        window.parent.postMessage(
          {
            _c: {
              resize: ref.current.offsetHeight,
            },
          },
          "*",
        );
      })
      .catch(() => {
        setLoading(false);
      });
  }, [userEmail]);

  return (
    <Container ref={ref}>
      {loading && <Loader />}
      {!loading && data?.issues.length === 0 && (
        <PaddedContainer>
          <NoResults
            title="No results"
            subtitle="Didn't find any issues with this query"
          />
        </PaddedContainer>
      )}
      {!loading && data?.issues.length > 0 && (
        <>
          <HeaderContainer>
            <TextEpsilon>Your open Jira issues</TextEpsilon>
            <Link to="/setup">Setup</Link>
          </HeaderContainer>
          <Ul>
            {data?.issues.map((issue, index) => (
              <JiraListItem issue={issue} index={index} key={issue.id} />
            ))}
          </Ul>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const HeaderContainer = styled.div`
  padding: ${padding300} ${padding300} ${padding200} ${padding300};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PaddedContainer = styled.div`
  padding: ${padding300};
`;
export default Jira;
