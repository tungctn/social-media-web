class CreateReactsPosts < ActiveRecord::Migration[7.0]
  def change
    create_table :reacts_posts do |t|
      t.belongs_to :post, null: false, foreign_key: true
      t.belongs_to :react, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
