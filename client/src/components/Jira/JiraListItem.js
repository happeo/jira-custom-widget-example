import { BodyUI } from "@happeouikit/typography";
import { Badge, LinkExternal } from "@happeouikit/form-elements";
import { LiStriped } from "@happeouikit/list";
import { margin200, margin400 } from "@happeouikit/layout";

const JiraListItem = ({ issue, index }) => {
  const { key, fields } = issue;
  return (
    <LiStriped key={index} style={{ justifyContent: "space-between" }}>
      <LinkExternal
        href={`https://getuniverse.atlassian.net/browse/${key}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={fields.issuetype.iconUrl}
          alt={fields.issuetype.name}
          style={{ marginRight: margin200 }}
        />
        <BodyUI
          style={{
            marginRight: margin400,
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          {key}
        </BodyUI>
        <BodyUI>{fields.summary}</BodyUI>
      </LinkExternal>
      <Badge text={fields.status.name} isFilled />
    </LiStriped>
  );
};

export default JiraListItem;
