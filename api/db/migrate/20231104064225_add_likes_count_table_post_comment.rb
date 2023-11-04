class AddLikesCountTablePostComment < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :likes_count, :integer, comment: "Số like", :default => 0
  end
end
