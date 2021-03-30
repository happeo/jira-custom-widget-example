import React, { useEffect, useRef, useState } from "react";

import { Ul } from "@happeouikit/list";
import { BodyUI, TextEpsilon } from "@happeouikit/typography";
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
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/issues`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) {
          setError(data.error);
          return;
        }

        setData(data);

        window.parent.postMessage(
          {
            _c: {
              resize: ref.current.offsetHeight,
            },
          },
          "*",
        );
      });
  }, [userEmail]);

  return (
    <Container ref={ref}>
      {loading && <Loader />}
      {!loading && error && (
        <div>
          <HeaderContainer>
            <Link to="/setup">Setup</Link>
          </HeaderContainer>
          <TextEpsilon>Something went wrong</TextEpsilon>
          <BodyUI>{JSON.stringify(error)}</BodyUI>
        </div>
      )}
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
            <TextEpsilon>Jira issues</TextEpsilon>
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
