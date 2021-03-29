import { gray09 } from "@happeouikit/colors";
import { margin200, margin400, padding300 } from "@happeouikit/layout";
import { BodyUI, TextEpsilon } from "@happeouikit/typography";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Advertisement = () => {
  return (
    <Container>
      <TextEpsilon style={{ marginBottom: margin200 }}>
        Happeo Jira widget
      </TextEpsilon>
      <BodyUI>
        Start by setting up Jira for your organisation and see results in Issues
        view.
      </BodyUI>
      <Navigation>
        <Link to="/setup" style={{ marginRight: margin400 }}>
          Setup
        </Link>
        <Link to="/issues">Issues</Link>
      </Navigation>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: ${padding300};
`;
const Navigation = styled.div`
  margin-top: ${margin400};
  display: flex;
  background-color: ${gray09};
  padding: ${padding300};
`;

export default Advertisement;
