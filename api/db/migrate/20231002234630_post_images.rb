class PostImages < ActiveRecord::Migration[7.0]
  def change
    create_table :post_images do |t|
      t.references :post, foreign_key: true
      t.references :image, foreign_key: true
      t.timestamps
    end
  end
end
