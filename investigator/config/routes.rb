Rails.application.routes.draw do
  get "api/portfolio", to: "portfolios#index"
  get "api/portfolio/:id", to: "portfolios#show"
  post "api/portfolio", to: "portfolios#create"
  delete "api/portfolio/:id", to: "portfolios#destroy"
  put "api/portfolio/:id", to: "portfolios#update"
  get "api/search/:query", to: "searches#search"

  #resource :portfolio, path: "api/portfolio"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
