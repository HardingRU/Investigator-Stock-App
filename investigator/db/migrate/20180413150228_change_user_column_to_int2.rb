class ChangeUserColumnToInt2 < ActiveRecord::Migration[5.1]
  def change
    remove_column :portfolios, :user_id
    add_column :portfolios, :user_id, :integer

  end
end
