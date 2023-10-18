class AddColumnCountToPost < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :comments_count, :integer, comment: "Số lượng comment", :default => 0
    add_column :posts, :likes_count, :integer, comment: "Số lượng biểu cảm", :default => 0
    add_column :posts, :shares_count, :integer, comment: "Số lượng share", :default => 0
  end
end
