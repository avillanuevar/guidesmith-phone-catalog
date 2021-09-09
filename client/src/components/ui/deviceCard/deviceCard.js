import React, { Component } from "react";
import { Link } from "react-router-dom";

import PhoneService from "../../../services/Phones.service.js";
import "./deviceCard.scss";

import noPhoneImage from "../../media/noPhoneImage.png"

class DeviceCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
          device: this.props.device,
      }
    this._phoneService = new PhoneService();
    }

    deleteDevice(e) {
      e.preventDefault()
      let id = e.currentTarget.value;
      window.dispatchEvent(new CustomEvent('device-deleted', {bubbles: true, composed: true, detail:id}));
    }

    editDevice(e) {
      e.preventDefault()
      let id = e.currentTarget.value;
      window.dispatchEvent(new CustomEvent('device-edit', {bubbles: true, composed: true, detail:{id}}));
    }

    render() {
        let { _id,
            name, 
            memory, 
            color, 
            imageUrl, 
            simStatus, 
            price } = { ...this.state.device };
      return  (
        <div className='device-card'>
          <Link className="link" to={`/details/${_id}`} style={{ textDecoration: 'none' }}>
            <div className='device-card-info'>
              <img className='device-card-image' src={imageUrl ? imageUrl : noPhoneImage} alt={name} />
              <div className='device-card-text'>
                <p className='device-card-title'>{name}</p>
                <p className='device-card-specs'>{memory} GB - {color} - {simStatus}</p>
                <p className='card-price-title'>Starting from</p>
                <p className='card-price'>{price},00 $</p>
              </div>
            </div>
          </Link>
          <div className='card-button-group'>
                <button className='card-button add' onClick={this.editDevice.bind(this)} value={_id}>Edit</button>
                <button className='card-button delete' onClick={this.deleteDevice.bind(this)} value={_id}>Delete</button>
          </div>
        </div>  
      );
    }
}
  
  export default DeviceCard;
  