class AddForeignKeyTwo < ActiveRecord::Migration[5.1]
  def change
    add_column :portfolios, :user_id, :string
    add_index :portfolios, :user_id
  end
end
