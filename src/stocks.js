import React, {useState, useEffect} from 'react';
import {Form, Button, FormGroup, Input} from 'reactstrap';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Stocks() {
    const url="http://localhost:3001/stocks/symbols";
    const [stockRowData, setStockRowData] = useState([]);
    const [stockCount, setStockCount] = useState(0);
  
    let industrySelector = "";
    const columns = [
      {headerName: "Name"    , field: "name"    },
      {headerName: "Symbol"  , field: "symbol"  },
      {headerName: "Industry", field: "industry"}
    ];
  
    useEffect(() => {
      if (document.getElementById('stocksSearch').value !== "") {
        industrySelector = "?industry=" + document.getElementById('stocksSearch').value;
      } else {
        industrySelector = "";
      }
      fetch(url + industrySelector)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(res => res.json())
        .then(data => data.map(
          stock => {
            return {
              name: stock.name,
              symbol: stock.symbol,
              industry: stock.industry
            }
          }
        ))
        .then(stocks => {
          setStockRowData(stocks)
          document.getElementById('stocksSearch').className = 'form-control is-valid';
        })
        .catch(error => {
          console.log(error)
          document.getElementById('stocksSearch').className = 'form-control is-invalid';
        })
    }, [stockCount]);
    
    return (
      <div className="container">
            <h1>Stocks and Symbols</h1>
            <Form inline>
              <FormGroup className="mb-2 ml-sm-1 mb-sm-2" row>
                <Input type="text" id="stocksSearch" placeholder="Search by Industry" className="mr-sm-3"></Input>
                <Button className="btn-success ml-sm-3" onClick={() => {setStockCount(stockCount + 1); console.log(stockCount)}}>Search!</Button>
                <div className="invalid-feedback">Please select a valid industry.</div>
              </FormGroup>
            </Form>
            <div className="ag-theme-balham"
              style={{
                height: "350px",
                width:  "625px"
              }}>
                <AgGridReact
                  columnDefs={columns}
                  rowData={stockRowData}
                  pagination={true}
                  paginationAutoPageSize={true}/>
              </div>
          </div>
    )
}

export default Stocks;