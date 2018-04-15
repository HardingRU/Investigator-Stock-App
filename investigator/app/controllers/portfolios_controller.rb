class PortfoliosController < ApplicationController
  include HTTParty
  before_action :authenticate_user
  def index
    @portfolios = User.find(params[:user]).portfolios
    render json: {
      message: "all portfolios",
      data: @portfolios
    }
  end

  def check
    id = User.find_by(email: params[:user])
    @check = Portfolio.find_by(ticker: params[:ticker], user_id: id[:id])
    render json: {
      message: "data refreshed",
      data: @check
    }
  end

  def refresh
    @response = HTTParty.get("https://www.quandl.com/api/v3/datasets/EOD/#{params[:id]}.json?limit=1&api_key=#{ENV['QUANDL']}")
    render json: {
      message: "data refreshed",
      data: @response
    }
  end

  def ytd
    @response = HTTParty.get("https://www.quandl.com/api/v3/datasets/EOD/#{params[:ticker]}.json?limit=2&api_key=#{ENV['QUANDL']}&collapse=annual")
    render json: {
      message: "data refreshed",
      data: @response
    }
  end

  def addStock
    @stock = Portfolio.new
    @stock.ticker = params[:ticker]
    @stock.shares_owned = params[:shares]
    @stock.purchase_price = params[:price]
    @stock.current_price = params[:price]
    @stock.exchange = "NA"
    id = User.find_by(email: params[:user])
    @stock.user_id = id[:id]
    name = Search.find_by(search_ticker: params[:ticker])
    @stock.stock_name = name[:search_name]
    @stock.save
    render json: {
      message: "saved stock",
      data: @stock
    }
  end

  def editStock
    id = User.find_by(email: params[:user])
    @stock = Portfolio.find_by(user_id: id[:id], ticker: params[:ticker])
    @stock.ticker = params[:ticker]
    @stock.shares_owned = params[:shares]
    @stock.purchase_price = params[:price]
    @stock.current_price = params[:price]
    @stock.exchange = "NA"
    @stock.user_id = id[:id]
    name = Search.find_by(search_ticker: params[:ticker])
    @stock.stock_name = name[:search_name]
    @stock.save
    render json: {
      message: "saved stock",
      data: @stock
    }
  end

  def removeStock
    id = User.find_by(email: params[:user])
    @portfolio = Portfolio.find_by(user_id: id[:id], ticker: params[:ticker])
    @portfolio.delete
    render json: {
      message: "delete",
      data: params[:ticker]
    }
  end

  def chart
      @response = HTTParty.get("https://www.quandl.com/api/v3/datasets/EOD/#{params[:id]}.json?api_key=#{ENV['QUANDL']}")
    render json: {
      message: "stock chart data",
      data: @response
    }
  end

  def show
    @portfolio = Portfolio.find(params[:id])
    render json: {
      message: "a portfolio",
      data: @portfolio
    }
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    @portfolio.delete
    render json: {
      message: "delete",
      data: params[:id]
    }
  end

def create
    @portfolio = Portfolio.new(portfolio_params)
    @portfolio.save
    render json: {
      message: "saved",
      data: @portfolio
    }
  end

  def update
    # @portfolio = Portfolio.find_by ticker: params[:id]
    # @portfolio.update(portfolio_params_update)
    id = User.find_by(email: params[:user])
    @portfolio = Portfolio.find_by(ticker: params[:id], user_id: id[:id])
    puts "PORTFOLIO"
    puts @portfolio
    @portfolio.update(portfolio_params_update)
    render json: {
      message: "updated",
      data: @portfolio
    }
  end

  private
  def portfolio_params
      params.require(:portfolio).permit(:user_id, :ticker, :stock_name, :exchange,
                                         :shares_owned, :purchase_price, :current_price)
  end

  def portfolio_params_update
      params.require(:portfolio).permit(:ticker, :current_price, :user_id)
  end

end
