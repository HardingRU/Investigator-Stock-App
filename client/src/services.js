
import axios from 'axios';

class Services {
  getPortfolio() {
    return axios.get('/api/portfolio')
  }

  getLatestData(input) {
    // return axios.get('/api/portfolio/update')
    return axios.get(`https://www.quandl.com/api/v3/datasets/EOD/${input}.json?limit=1&api_key=-zxmVteaSiZjzxyvdkU`)
  }

  updateData(input) {
    axios({
      method: 'put',
      url: `/api/portfolio/${input.dataset_code}`,
      data: {
        ticker: input.dataset_code,
        current_price: input.data[0][11]
      }
    });
  }

  search(ticker) {
    return axios.get(`/api/search/${ticker}`)
  }

  getChart(ticker) {
    return axios.get(`https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=-zxmVteaSiZjzxyvdkU`)
  }

//  getSinglePortfolio() {
//    return axios.get(`/api/portfolio${id}`);
//  }
}

export default new Services();
