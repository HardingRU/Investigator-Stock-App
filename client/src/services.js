
import axios from 'axios';

class Services {
  getPortfolio() {
    return axios({
      method: 'get',
      url: '/api/portfolio',
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  register(info) {
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

  getLatestData(ticker) {
    return axios.get(`/api/refresh/${ticker}`)
  }

  updateData(input) {
    axios({
      method: 'put',
      url: `/api/update/${input.dataset_code}`,
      data: {
        ticker: input.dataset_code,
        current_price: input.data[0][11]
      },
      headers: {
       'Authorization': localStorage.jwt,
     }
    });
  }

  search(ticker) {
    return axios({
      method: 'get',
      url: `/api/search/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  getChart(ticker) {
    return axios.get(`/api/data/${ticker}`)
  }

  login(user_info) {
    return axios({
      method: 'post',
      url: "/api/user_token",
      data: user_info
    })
  }

}

export default new Services();
