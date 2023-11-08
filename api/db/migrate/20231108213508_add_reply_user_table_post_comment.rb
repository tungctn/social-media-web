class AddReplyUserTablePostComment < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :user_reply_name, :string, comment: "Người dùng của bình luận cha", :default => nil
    add_column :post_comments, :user_reply_id, :integer, comment: "Id người dùng của bình luận cha", :default => nil
  end
end
