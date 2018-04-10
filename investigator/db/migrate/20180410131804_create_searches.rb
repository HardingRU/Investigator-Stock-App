class CreateSearches < ActiveRecord::Migration[5.1]
  def change
    create_table :searches do |t|
      t.string :search_ticker
      t.string :search_name
      t.timestamps
    end
  end
end
