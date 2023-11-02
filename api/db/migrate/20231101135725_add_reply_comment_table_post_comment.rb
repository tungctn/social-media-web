class AddReplyCommentTablePostComment < ActiveRecord::Migration[7.0]
  def change
    add_column :post_comments, :comment_reply, :integer, comment: "Id của bình luận cha", :default => nil
  end
end
