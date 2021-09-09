import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/phones',
        })
    }

    getAllDevices = () => this._service.get('/getAllPhones');
    getDeviceDetail = id => this._service.get(`/details/${id}`);
    addNewDevice = device => this._service.post('/create', device);
    deleteDevice = id => this._service.get(`/delete/${id}`);
}