class CreateImagesPostComments < ActiveRecord::Migration[7.0]
  def change
    create_table :images_post_comments do |t|
      t.references :post_comment, foreign_key: true
      t.references :image, foreign_key: true
      t.timestamps
    end
  end
end
