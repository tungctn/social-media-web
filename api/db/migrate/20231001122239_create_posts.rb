class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :user, index: true, foreign_key: {to_table: :users}, comment: "Bài viết được đặt trên Profile User này"
      t.references :sender, index: true, foreign_key: {to_table: :users}, comment: "Bài viết được gửi từ ai, có thể là chính user_id"
      t.text :content, :limit => 4294967295, comment: "Nội dung bài viết"
      t.integer :status, comment: "Trạng thái bài viết: Hoạt động, tạm khóa, ..."
      t.timestamps
    end
  end
end
