
import axios from 'axios';

class Services {
  getPortfolio(user) {
    return axios({
      method: 'get',
      url: `/api/portfolio/${user}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  findUser(email) {
    return axios({
      method: 'get',
      url: `api/user/find/${email}`,
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

  getLatestData(ticker, user) {
    return axios({
      method: 'get',
      url: `/api/refresh/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  getYearEnd(ticker) {
    return axios({
      method: 'get',
      url: `api/ytd/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  updateData(input) {
    axios({
      method: 'put',
      url: `/api/update/${input.dataset_code}/${localStorage.email}`,
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

  addStock(input) {
    return axios({
      method: 'post',
      url: `/api/portfolio/add`,
      data: input,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  editStock(input) {
    return axios({
      method: 'put',
      url: `/api/portfolio/edit`,
      data: input,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  removeStock(ticker, user) {
    return axios({
      method: 'delete',
      url: `/api/delete/${user}/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  getChart(ticker) {
    return axios({
      method: 'get',
      url: `/api/data/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }

  login(user_info) {
    return axios({
      method: 'post',
      url: "/api/user_token",
      data: user_info
    })
  }

  checkOwned(ticker, user) {
    return axios({
      method: 'get',
      url: `/api/check/${user}/${ticker}`,
      headers: {
       'Authorization': localStorage.jwt,
     }
    })
  }


}

export default new Services();
