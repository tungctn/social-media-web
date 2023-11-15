class CreatePostSaves < ActiveRecord::Migration[7.0]
  def change
    create_table :post_saves do |t|
      t.references :post, foreign_key: true
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
