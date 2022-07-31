import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {Form, Button, FormGroup, Input} from 'reactstrap';

function Quote() {
    const url = "http://localhost:3001/stocks/";
    let symbolSelector = "";
    let quoteData = [];
    const [quoteRowData, setQuoteRowData] = useState([]);
    const [quoteCount, setQuoteCount] = useState(0);
    const columns = [
      {headerName: "Timestap", field: "timestamp"},
      {headerName: "Symbol"  , field: "symbol"   },
      {headerName: "Name"    , field: "name"     },
      {headerName: "Industry", field: "industry" },
      {headerName: "Open"    , field: "open"     },
      {headerName: "High"    , field: "high"     },
      {headerName: "Low"     , field: "low"      },
      {headerName: "Close"   , field: "close"    },
      {headerName: "Volumes" , field: "volumes"  }
    ];
  
    useEffect(() => {
      if (document.getElementById('quoteSearch').value !== "") {
        symbolSelector = document.getElementById('quoteSearch').value;
      } else {
        symbolSelector = "";
      }
      fetch(url + symbolSelector)
      .then(response => {
        if (!response.ok) {throw Error(response)}
        document.getElementById('quoteSearch').className = "form-control is-valid"
        return response;
      })
      .then(response => response.json())
      .then(json => {
        quoteData.push(json);
        quoteData.map(
          data => {
            return {
              timestamp: data.timestamp,
              symbol: data.symbol,
              name: data.name,
              industry: data.industry,
              open: data.open,
              low: data.low,
              close: data.close,
              volumes: data.volumes
            }
          },
          setQuoteRowData(quoteData))
        })
      .catch(error => {
        console.log(error)
        document.getElementById('quoteSearch').className = "form-control is-invalid";
      })
    }, [quoteCount]);
  
    return (
      <div className="container">
        <h1>Price Quote</h1>
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
            <Input type="text" id="quoteSearch" placeholder="Search by Symbol" className="mr-sm-3"></Input>
            <Button className="btn-success ml-sm-3" onClick={() => {setQuoteCount(quoteCount+1)}}>Search!</Button>
            <div className="invalid-feedback">Please input a valid stock symbol.</div>
          </FormGroup>
        </Form>
        <div className="ag-theme-balham"
          style={{
            height: "80px",
            width:  "1200px"
          }}>
            <AgGridReact
              columnDefs={columns}
              rowData={quoteRowData}
              pagination={false}/>
        </div>
      </div>
    )
  }

  export default Quote;