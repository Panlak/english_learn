class CreateEnglishDictionaries < ActiveRecord::Migration[7.0]
  def change
    create_table :english_dictionaries do |t|
      t.string :word
      t.string :translate

      t.timestamps
    end
  end
end
