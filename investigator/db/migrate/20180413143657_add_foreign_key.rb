class AddForeignKey < ActiveRecord::Migration[5.1]
  def change
    remove_column :portfolios, :user_id
    #add_foreign_key :portfolios, :users
  end
end
