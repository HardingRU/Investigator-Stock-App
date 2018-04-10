class SearchesController < ApplicationController

  def search
    @results = Search.all
    @results = Search.where("search_name LIKE '%#{params[:query]}%'")
    render json: {
      message: "search results retrieved",
      data: @results
    }
  end
end
