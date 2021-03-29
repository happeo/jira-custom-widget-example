import styled from "styled-components";

import { BodyUI, TextEpsilon } from "@happeouikit/typography";
import { margin400 } from "@happeouikit/layout";

const NoResults = ({ title, subtitle }) => {
  return (
    <Container>
      <TextEpsilon style={{ marginBottom: margin400 }}>{title}</TextEpsilon>
      <BodyUI>{subtitle}</BodyUI>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NoResults;
