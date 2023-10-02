class DeleteEmailColumnToUserInfos < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_infos, :email, :string
  end
end
