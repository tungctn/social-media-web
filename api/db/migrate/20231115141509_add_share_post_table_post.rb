class AddSharePostTablePost < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :share, foreign_key: { to_table: :posts }, index: true, comment: "Chia sẻ bài viết", :default => nil
  end
end
