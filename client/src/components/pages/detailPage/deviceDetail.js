import React, { Component } from "react";
import { Link } from "react-router-dom";

import PhoneService from "../../../services/Phones.service.js";
import noPhoneImage from "../../media/noPhoneImage.png"

import "./deviceDetail.scss"

class DeviceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      device: {},
  };
    this.phoneService = new PhoneService();
  }
  
  componentDidMount = () => {
    const deviceId = this.props.match.params.id;
    this.phoneService
    .getDeviceDetail(deviceId)
    .then(theDevice => {this.setState({ device: theDevice.data })})
    .catch(err => console.log(err));
  };

  render() {
      let { color,
        description,
        manufacturer,
        name,
        price,
        simStatus,
        memory,
        imageUrl,
        screen,
        processor } = this.state.device;
    return (
        <>
        <Link className="link" to={`/`} style={{ textDecoration: 'none' }}>
            <iron-icon class='arrow' icon="arrow-back"></iron-icon>
        </Link>
        <div className='details-page'>
            <div className='device-information'>
                <h1 className='device-title'>{name} - {memory} GB - {color} - {simStatus}</h1>
                <p className='device-subtitle'>{manufacturer}</p>
                <p>Screen: {screen}</p>
                <p>Processor: {processor}</p>
                <p>{description}</p>
                <p className='device-price'>{price} $</p>
            </div>
            <div className='device-image'>
                <img className='device-detail-image' src={imageUrl ? imageUrl : noPhoneImage} alt={name} />
            </div>
           
        </div>
    </>
    );
  }
}

export default DeviceDetail;