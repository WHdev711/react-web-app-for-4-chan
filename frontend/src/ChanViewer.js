import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

import MUIDataTable from "mui-datatables";

import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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
query GetChanchildren {
    chanchildren {
      no
      now
      name
      com
      time
      resto
      trip
    }
  }
`;

export const GET_CHILDPOSTS = gql`
  query GetChanchilds {
    chanchildren {
      no
      now
      name
      com
      time
      resto
      trip
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) =>
      loading ? (
        <CircularProgress className="mt-100" />
      ) : (
        <div className="ag-theme-alpine" style={ { height: 900, width: 1400 } }>
          {console.log(JSON.stringify(data) )}
            <AgGridReact
                modules={[ClientSideRowModelModule, RowGroupingModule]}
                rowData={data.chanchildren}>
                <AgGridColumn field="resto" rowGroup={true} hide={true}></AgGridColumn>
                <AgGridColumn field="no"></AgGridColumn>
                <AgGridColumn field="now"></AgGridColumn>
                <AgGridColumn field="name"></AgGridColumn>
                <AgGridColumn field="com"></AgGridColumn>
                <AgGridColumn field="time"></AgGridColumn>
                <AgGridColumn field="trip"></AgGridColumn>
            </AgGridReact>
      </div>
      )
    }
  </Query>
);
