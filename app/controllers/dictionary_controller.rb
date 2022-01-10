class DictionaryController < ApplicationController
  
  def index
    @words = EnglishDictionary.all
    respond_to do |format|
      format.html  
      format.json { render json: {data: EnglishDictionary.all }
 
    }
    end
  end

  def save_dictionary
     @words = EnglishDictionary.all
     array  = []

     @words.each do |x|
        array.push([x.word, x.translate].compact.join(' = '))
      end
      pp array
      respond_to do |format|
        format.html
        format.csv {send_data array.to_csv(),filename:"dictionary-#{Date.today}.csv"}
      end
  end

  def new
    @dictionary = EnglishDictionary.new

  end

  def create
    @dictionary = EnglishDictionary.new(dictionary_params)

    if @dictionary.save
      redirect_to action: "index"
      
    else
      redirect_to '/dictionary/new'  
      
    end
  end

  def edit
    pp params
    @word = EnglishDictionary.find(params[:id])
    @word.update(word: params[:english_dictionary][:word],translate:  params[:english_dictionary][:translate])
    redirect_to action: "index"
  end


  def destroy
    @word = EnglishDictionary.find(params[:id])
    @word.destroy
    redirect_to "/dictionary/index"
  end
  def regular_irregular_verbs
 
    respond_to do |format|
      format.html
      format.json{
        
        render json: {data:RegularIrregularVerb.all }
      }
    end
  end
  
  
  private

  def dictionary_params
    params.require(:english_dictionary).permit(:word,:translate)
  end

end
