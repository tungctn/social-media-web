class AddColumnToUserInfos < ActiveRecord::Migration[7.0]
  def change
    add_column :user_infos, :background_url, :string
    add_column :user_infos, :avatar_url, :string
  end
end
