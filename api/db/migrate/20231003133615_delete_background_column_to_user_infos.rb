class DeleteBackgroundColumnToUserInfos < ActiveRecord::Migration[7.0]
  def change
    remove_column :user_infos, :background_url, :string
  end
end
