class SearchesController < ApplicationController
  before_action :authenticate_user
  def search
    puts current_user
    @results = Search.all
    @results = Search.where("search_name LIKE '%#{params[:query]}%'")
    render json: {
      message: "search results retrieved",
      data: @results
    }
  end
end
