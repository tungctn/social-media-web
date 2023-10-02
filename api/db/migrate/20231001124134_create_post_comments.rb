class CreatePostComments < ActiveRecord::Migration[7.0]
  def change
    create_table :post_comments do |t|
      t.references :post, foreign_key: true
      t.references :user, foreign_key: true
      t.text :content, :limit => 4294967295, comment: "Nội dung comment"
      t.timestamps
    end
  end
end
