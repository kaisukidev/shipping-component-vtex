import React, { Component } from 'react';
import store from './config/storeInfo.json';
import InputMask from 'react-input-mask';
import axios from 'axios';

export default class shipping extends Component{
  state = {
    cep: '',
    errorMsg: ''
  }
  onChange = (event) => {
    this.setState({
      cep: event.target.value
    });
  }
  buildData(){
    let DataToSend, id;
    id = document.querySelector('.freight-zip-box').value || store.productId;
    DataToSend = {
      'items': [{
        'id': id,
        'quantity': 1,
        'seller': store.sc
      }],
      'postalCode': this.state.cep,
      'country': store.country,
    };
    return DataToSend;
  }
  getShippingValues(){
    if(!this.state.cep) this.setState({ errorMsg: 'Digite o CEP primeiro' });
    axios.post(`${store.storeUrl}api/checkout/pub/orderForms/simulation/?sc=${store.sc}`, this.buildData)
      .then(data => {
        // Mount your shipping table
      })
      .catch(error => {
        throw error;
      })
  }
  render (){
    return(
      <div className="shipping-container">
        <h3>{store.shippingLabel}</h3>
        <InputMask {...this.props} mask="99999-999" maskChar="" placeholder="Digite seu CEP" value={this.state.value} onChange={this.onChange}/>
        <input type="button" value="Calcular" onClick={this.getShippingValues.bind(this)}/>
        <a href={store.buscaCep} className="search-cep" target="_blank" rel="noopener noreferrer">Não sei meu CEP</a>
        <small>{this.state.errorMsg}</small>
      </div>
    )
  }
}