import React, { useState }  from 'react';
import axios from 'axios';
import $ from 'jquery';
import { ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';
import './MyVehicles.css';
import { render } from 'react-dom';
import charge from './Modal';

class Stations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [], ChargingPoints: [], modalIsOpen: false
        };
      }
      
      componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
              'X-OBSERVATORY-AUTH': localStorage.getItem("token")
            }
          }
           fetch('//localhost:8765/evcharge/api/chargingStations', requestOptions)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
                var initial = data;
                this.setState({ChargingPoints: initial});
              $(this.refs.main).DataTable({
                // dom: '<"data-table-wrapper"t>',
                data: data,
                columns:[
                  {
                    title: 'Town',
                    width: "15%",
                    data: 'address.Town'
                },
                {
                    title: 'Address',
                    width: "15%",
                    data: 'address.AddressLine1'
                },
                {
                  title: 'Country',
                  width: "15%" ,
                  data: 'address.Country.Title'
              },
            {
              title: 'Action',
              width: "25%",
              data: 'id',
              'render' : function(id){
                return(
                '<a className="btk" class="makechargeBtn" id="'+ id + '" ><i type="button">charge</i></a>'
                )}
          }

            ],
                ordering: false
             });
             $(".makechargeBtn").on('click',function(ev){
              this.refs.setState({modalIsOpen: true})
              
                      
            })
            
            })
            .catch(error => {
              console.error(error);
            })
        }
    render() {
        return (
            <html>
            <body className="stations-body">
              <meta charSet="UTF-8" />
              <title>Stations</title>
            <div>
                <h2>Stations</h2>

                <table ref="main" />
                
            </div>
            </body>
            </html>
        )
    }
}

export default Stations;