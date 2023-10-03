class ChangeNamePostImage < ActiveRecord::Migration[7.0]
  def change
    rename_table :post_images, :images_posts
  end
end
