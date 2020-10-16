import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";

import MUIDataTable from "mui-datatables";

const columns = [
  "chanId",
  "link",
  "img",
  "replies",
  "imgReplies",
  "title",
  "op",
  "unique_ips"
];

const options = {
  filterType: "checkbox",
};

export const GET_POSTS = gql`
  query GetChans {
    chans {
      chanId
      link
      img
      replies
      imgReplies
      title
      op
      unique_ips
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) =>
      loading ? (
        <CircularProgress className="mt-100" />
      ) : (
        <MUIDataTable
          title={"Chan List"}
          data={data.chans.map((item) => {
            return [
              item.chanId,
              item.link,
              item.img,
              item.replies,
              item.imgReplies,
              item.title,
              item.op,
              item.unique_ips,
            ];
          })}
          columns={columns}
        />
      )
    }
  </Query>
);
