
import axios from 'axios';

class Services {
  getPortfolio() {
    return axios.get('/api/portfolio')
  }

//  getSinglePortfolio() {
//    return axios.get(`/api/portfolio${id}`);
//  }
}

export default new Services();
