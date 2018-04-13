class ChangeUserColumnToInt < ActiveRecord::Migration[5.1]
  def change
    change_column :portfolios, :user_id, :string
  end
end
