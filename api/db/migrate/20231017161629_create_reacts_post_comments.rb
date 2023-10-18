class CreateReactsPostComments < ActiveRecord::Migration[7.0]
  def change
    create_table :reacts_post_comments do |t|
      t.belongs_to :post_comment, null: false, foreign_key: true
      t.belongs_to :react, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
