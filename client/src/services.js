
import axios from 'axios';

class Services {
  getPortfolio() {
    console.log(localStorage)
    //return axios.get('/api/portfolio')
    return axios({
      method: 'get',
      url: '/api/portfolio',
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  register(info) {
    console.log(info)
    return axios({
      method: 'post',
      url: "/api/user",
      data: info
    })
  }

  cAuth() {
    return axios({
      method: 'get',
      url: '/api/search/AAPL',
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
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
    //return axios.get(`/api/search/${ticker}`)
    return axios({
      method: 'get',
      url: `/api/search/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  getChart(ticker) {
    return axios.get(`https://www.quandl.com/api/v3/datasets/EOD/${ticker}.json?api_key=-zxmVteaSiZjzxyvdkU`)
  }

  login(user_info) {
    console.log(user_info)
    return axios({
      method: 'post',
      url: "/api/user_token",
      data: user_info
    })
  }

//  getSinglePortfolio() {
//    return axios.get(`/api/portfolio${id}`);
//  }
}

export default new Services();
