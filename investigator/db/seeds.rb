# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Portfolio.create([
  {
    user_id: 1,
    ticker: "AAPL",
    stock_name: "Apple Inc.",
    exchange: "NYSE",
    shares_owned: 100,
    purchase_price: 10,
    current_price: 100
  },
  {
    user_id: 1,
    ticker: "TSLA",
    stock_name: "Tesla",
    exchange: "NYSE",
    shares_owned: 100,
    purchase_price: 5,
    current_price: 500
  },
  {
    user_id: 1,
    ticker: "MSFT",
    stock_name: "Microsoft",
    exchange: "NYSE",
    shares_owned: 50,
    purchase_price: 1,
    current_price: 250
  }
])
