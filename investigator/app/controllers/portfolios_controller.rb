class PortfoliosController < ApplicationController

  def index
    @portfolios = Portfolio.all
    render json: {
      message: "all portfolios",
      data: @portfolios
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
    @portfolio = Portfolio.find_by ticker: params[:id]
    @portfolio.update(portfolio_params_update)
    render json: {
      message: "updated",
      data: @portfolio
    }
  end

  private
  def portfolio_params
      params.require(:portfolio).permit(:user_id, :ticker, :stock_name, :exchange,
                                         :shares_owend, :purchase_price, :current_price)
  end

  def portfolio_params_update
      puts "params"
      puts params
      params.require(:portfolio).permit(:ticker, :current_price)
  end

end
