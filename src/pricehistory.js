import React, {useState, useEffect} from 'react';
import {JWToken} from './login.js';
import {Label, Form, Button, FormGroup, Input} 
    from 'reactstrap';
import {AgGridReact} from 'ag-grid-react';
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

function PriceHistory() {
    const url = "http://localhost:3001/stocks/authed/";
    let symbolSelector = "";
    let fromDate= "2019-11-06";
    let toDate = "2020-03-24";
    const [priceRowData, setPriceRowData] = useState([]);
    const [priceCount, setPriceCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    const columns = [
      {headerName: "Timestamp", field: "timestamp", sortable: true},
      {headerName: "Symbol"   , field: "symbol"                   },
      {headerName: "Name"     , field: "name"                     },
      {headerName: "Industry" , field: "industry"                 },
      {headerName: "Open"     , field: "open"     , sortable: true},
      {headerName: "High"     , field: "high"     , sortable: true},
      {headerName: "Low"      , field: "low"      , sortable: true},
      {headerName: "Close"    , field: "close"    , sortable: true},
      {headerName: "Volumes"  , field: "volumes"  , sortable: true}
    ]
    
    useEffect(() => {
      if (document.getElementById('symbolSearch').value !== "") {
        symbolSelector = document.getElementById('symbolSearch').value;
      } else {
        symbolSelector = "";
      }
      fromDate = document.getElementById("fromInput").value;
      toDate = document.getElementById("toInput").value;
      fetch(url + symbolSelector + "?from=" + fromDate + "&to=" + toDate, {
        headers: {
          Authorization: "Bearer " + JWToken
        }
      })
        .then (response => {
          if (!response.ok) {throw Error(response.status)}
          document.getElementById('symbolSearch').className = 'form-control is-valid';
          return response;
        })
        .then(response => response.json())
        .then(json => json.map(
          price => {
            return {
              timestamp: price.timestamp,
              symbol: price.symbol,
              name: price.name,
              industry: price.industry,
              open: price.open,
              high: price.high,
              low: price.low,
              close: price.close,
              volumes: price.volumes
            }
          }
        ))
        .then(prices => {
          let data = []
          for (let i = 0; i < prices.length; i++) {
            data[i] = {name: prices[i].timestamp, high: prices[i].high}
          }
          setChartData(data);
          setPriceRowData(prices);
        })
        .catch(error => {
          document.getElementById('symbolSearch').className = " form-control is-invalid"
        })
    }, [priceCount])
    
    return (
      <div className="container">
        <h1>Price History</h1>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
            <Label for="symbolSearch" className="mr-sm-2">Symbol:</Label>
            <Input type="text" id="symbolSearch" placeholder="Search by Symbol"></Input>
            <Label for="fromInput" className="mr-sm-2 ml-sm-3">Show from:</Label>
            <Input type="date" id="fromInput" min="2019-11-06" max="2020-03-24" step="1" defaultValue="2019-11-06"></Input>
            <Label for="toInput" className="mr-sm-2 ml-sm-3">Show to:</Label>
            <Input type="date" id="toInput" min="2019-11-06" max="2020-03-24" defaultValue="2020-03-24"></Input>
            <Button className="btn-success ml-sm-3" onClick={() => {setPriceCount(priceCount+1)}}>Search!</Button>
            <div id="errorText  " className="invalid-feedback">Invalid query.</div>
            </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-4">
            </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-4">
            </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
            </FormGroup>
        </Form>
        <div className="ag-theme-balham"
          style={{
            height: "400px",
            width:  "1200px"
          }}>
            <AgGridReact
              columnDefs={columns}
              rowData={priceRowData}
              pagination={true}
              paginationAutoPageSize={true}/>
            <h2>High price over time</h2>
            <LineChart state={priceCount} width={1200} height={300} data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#8884d8" activeDot={{ r: 8 }} /> 
            </LineChart>
        </div>
      </div>
    )
  }

  export default PriceHistory;