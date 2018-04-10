
import axios from 'axios';

class Services {
  getPortfolio() {
    return axios.get('/api/portfolio')
  }

  getLatestData(input) {
    return axios.get(`https://www.quandl.com/api/v3/datasets/EOD/${input}.json?limit=1&api_key=9hgSRDpcxYf-n2xs7WVz`)
  }

//  getSinglePortfolio() {
//    return axios.get(`/api/portfolio${id}`);
//  }
}

export default new Services();
