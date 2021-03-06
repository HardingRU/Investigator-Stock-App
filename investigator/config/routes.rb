Rails.application.routes.draw do
  post '/api/user_token', to: 'user_token#create'
  post "api/user", to: "users#create"
  #get "api/portfolio", to: "portfolios#index"
  get "api/refresh/:id", to: "portfolios#refresh"
  get "api/portfolio/:user", to: "portfolios#index"
  post "api/portfolio/add", to: "portfolios#addStock"
  put "api/portfolio/edit", to: "portfolios#editStock"
  post "api/portfolio", to: "portfolios#create"
  get "api/data/:id", to: "portfolios#chart"
  delete "api/delete/:user/:ticker", to: "portfolios#removeStock"
  delete "api/portfolio/:id", to: "portfolios#destroy"
  put "api/portfolio/:id", to: "portfolios#refresh"
  put "api/update/:id/:user", to: "portfolios#update"
  get "api/search/:query", to: "searches#search"
  get "api/user/find/:token", to: "users#find"
  get "api/check/:user/:ticker", to: "portfolios#check"
  get "api/ytd/:ticker", to: "portfolios#ytd"


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
