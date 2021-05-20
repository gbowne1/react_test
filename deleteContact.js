const axios = require('axios');
import { APIURL } from './requests';

export function deleteContact(id) {
    return axios.delete(`${APIURL}/contacts/${id}`);
}
