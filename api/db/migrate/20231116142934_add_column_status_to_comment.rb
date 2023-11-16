class AddColumnStatusToComment < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :status, :integer, comment: "Trạng thái comment", :default => nil
  end
end
