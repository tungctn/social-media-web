class DeleteColumnToUserInfos < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_infos, :background_url, :string
    remove_column :user_infos, :avatar_url, :string
  end
end
