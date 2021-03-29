import { useEffect, useState } from "react";
import { margin200, margin400, padding300 } from "@happeouikit/layout";
import { BodyUI, TextEpsilon } from "@happeouikit/typography";
import { toast } from "@happeouikit/toast";
import styled from "styled-components";
import { ButtonPrimary } from "@happeouikit/buttons";
import { Loader } from "@happeouikit/loaders";
import { Input, Textarea } from "@happeouikit/form-elements";
import { Link } from "react-router-dom";

const Advertisement = () => {
  const [setup, setSetup] = useState({
    jiraHost: "",
    jiraUsername: "",
    jiraPassword: "",
    jql: "",
  });
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    fetch("/api/setup")
      .then((response) => response.json())
      .then((data) => {
        setSetup(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const onFieldChange = (e) => {
    setSetup((prevVal) => ({
      ...prevVal,
      [e.target.id]: e.target.value,
    }));
  };

  const saveSettings = () => {
    setSaveLoading(true);
    fetch("/api/setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...setup }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success({ message: "Saved!" });
        setSetup(data);
        setSaveLoading(false);
      })
      .catch((error) => {
        toast.error({ message: "Error Error!" });
        setSaveLoading(false);
      });
  };

  return (
    <Container>
      <TextEpsilon style={{ marginBottom: margin200 }}>
        Happeo Jira widget - Setup
      </TextEpsilon>
      {loading && <Loader />}
      {!loading && (
        <InputContainer>
          <Input
            label="Jira host"
            value={setup.jiraHost}
            id={"jiraHost"}
            onChange={onFieldChange}
          />
          <Input
            label="Jira username"
            value={setup.jiraUsername}
            id={"jiraUsername"}
            onChange={onFieldChange}
          />
          <BodyUI style={{ margin: "4px 0" }}>Jira password</BodyUI>
          <PasswordInput
            type="password"
            label="Jira password"
            value={setup.jiraPassword}
            id={"jiraPassword"}
            onChange={onFieldChange}
          />
          <Textarea
            label="Jira query (JQL)"
            value={setup.jql}
            id={"jql"}
            onChange={onFieldChange}
            rows={6}
          />
          <BodyUI>
            You can use {"{"}primaryEmail{"}"} as a placeholder. It will be
            replaced by the visiting user's primary email address.
          </BodyUI>
          <ActionContainer>
            <Link to="/issues">Issues</Link>
            <ButtonPrimary
              text="Save"
              onClick={saveSettings}
              disabled={saveLoading}
            />
          </ActionContainer>
        </InputContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: ${padding300};
`;
const InputContainer = styled.div``;
const ActionContainer = styled.div`
  margin-top: ${margin400};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PasswordInput = styled.input`
  font-family: "IBM Plex Sans", sans-serif;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid rgb(186, 198, 208);
  box-sizing: border-box;
  box-shadow: none;
  font-size: 14px;
  padding: 10px 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: 0.3px;
  color: rgb(0, 0, 0);
`;
export default Advertisement;
