class CreatePortfolios < ActiveRecord::Migration[5.1]
  def change
    create_table :portfolios do |t|
      t.integer :user_id
      t.string :ticker
      t.string :stock_name
      t.string :exchange
      t.integer :shares_owned
      t.decimal :purchase_price, precision: 10, scale: 2
      t.decimal :current_price, precision: 10, scale: 2
      t.timestamps
    end
  end
end
