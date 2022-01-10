class CreateRegularIrregularVerbs < ActiveRecord::Migration[7.0]
  def change
    create_table :regular_irregular_verbs do |t|
      t.string :first_form
      t.string :second_form
      t.string :third_form
      t.string :translate

      t.timestamps
    end
  end
end
