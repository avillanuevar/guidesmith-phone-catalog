import React, { Component } from "react";
import "./homePage.scss";
import DeviceCard from "../../ui/deviceCard/deviceCard.js"
import Loader from "react-loader-spinner";

import PhoneService from "../../../services/Phones.service.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        getAllPhones: [],
        openModal: false
    }
    this._phoneService = new PhoneService();
    this._getAllDevices = this._getAllDevices.bind(this);
    this._addDevice = this._addDevice.bind(this);
    this._manageModal = this._manageModal.bind(this);
    this._unlockModal  = this._unlockModal .bind(this);
  }

  componentDidMount() {
    window.addEventListener('device-deleted', this.updateDevicesDeletion.bind(this));
    window.addEventListener('device-edit', this._manageModal.bind(this));
    this._getAllDevices();
  };

  _getAllDevices() {
    this._phoneService
      .getAllDevices()
      .then(movileDevices => {
        this.setState({getAllPhones: movileDevices.data});
      })
      .catch(err => {
        console.error({ err });
      });
  }

  updateDevicesDeletion(e) {
    let deletedDeviceId = e.detail;
    this._phoneService.deleteDevice(deletedDeviceId);
    this._getAllDevices();
  }

  //This function was suposed to open and close the edition modal
  _manageModal(e) {
    e.preventDefault();
    e.detail.modalState = !this.state.openModal;
    this._changeModalState();
  }

  _changeModalState() {
    this.setState({ openModal: !this.state.openModal});
  }

  _addDevice() {
    let newDevice = {
      color: "Black",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor tellus quis urna ultricies vulputate. Ut ex diam, dignissim id orci at, ornare congue ex. Maecenas id mi nec tortor ornare porttitor. Vestibulum eget egestas eros, a viverra nulla. Nullam et lorem lorem. Cras convallis sapien justo, mattis gravida massa pulvinar rutrum. Pellentesque a orci elementum, sollicitudin magna nec, elementum ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      manufacturer: "Apple",
      name: "Iphone X",
      price: 999,
      simStatus: "Bloked",
      memory: 124,
      imageUrl: "https://www.transparentpng.com/thumb/-iphone-x/dO1Aqf-apple-iphone-caracteru-edsticas-especificaciones.png",
      screen: '7,4"',
      processor: "Super duper ultra processor"
    };
    this._phoneService.addNewDevice(newDevice)
      .then(device => {
        let devicesCopy = [ ...this.state.getAllPhones ];
        devicesCopy.push(device.data);
        this.setState({getAllPhones: devicesCopy})
      })
      .catch(err => console.error(err))
  }

  _unlockModal() {
    window.dispatchEvent(new CustomEvent('close-modal', {bubbles: true, composed: true, detail:{modalState: !this.state.openModal}}));
    this._changeModalState()
  }


  render() {
    let deviceList = this.state.getAllPhones;
    let showModal = this.state.openModal;
    return  (
  
        <div className='home'>
          <div className={ showModal ? 'show-modal' : 'hide-modal' }>
            <div className='modal-background' onClick={this._unlockModal}>
              <div className='modal'>
                <div className='modal-text'>
                  <h2 className='modal-title'>Sorry we have experience some technical dificulties</h2>
                  <p>(I didn`t have time to finish the edition modal, click to exit)</p>
                </div>
                
              </div>
            </div>
          </div>
          <div className='homeContent'>
            <h1>The Phone Catalog</h1>
            <div className='action-buttons'>
              <button className='create-device' onClick={this._addDevice}> <iron-icon class='' icon="add"/> Add new device</button>
            </div>
          </div>    
            { deviceList.length ? 
              <section className='diplay-cards'>
                {deviceList.map(device => {
                  return <DeviceCard device={device}></DeviceCard>
                })}
              </section>
           :
            <div className='loader'>
              <Loader
                type="Oval"
                color="#00BFFF"
                height={80}
                width={80}
              />
            </div>
          }
        </div>

    );
  }}

export default Home;
