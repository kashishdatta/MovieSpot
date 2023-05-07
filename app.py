import pandas as pd
import numpy as np
import pickle
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, render_template, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer

# Load movie data
movies = pd.read_csv('main_data.csv')

# Preprocess movie data
movies['comb'] = movies['comb'].fillna('')
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies['comb'])
cosine_sim = cosine_similarity(tfidf_matrix)

# Define function for semantic search
def semantic_search(query):
    query_tfidf = tfidf.transform([query])
    cosine_scores = cosine_similarity(query_tfidf, tfidf_matrix).flatten()
    cosine_scores_df = pd.DataFrame({'cosine_score': cosine_scores, 'movie': movies['movie_title']})
    ranked_movies = cosine_scores_df.sort_values('cosine_score', ascending=False)
    return ranked_movies


def createSimilarity():
    data = pd.read_csv('main_data.csv') # reading the dataset
    cv = CountVectorizer()
    countMatrix = cv.fit_transform(data['comb'].apply(lambda countMatrix: np.str_(countMatrix)))
    similarity = cosine_similarity(countMatrix) # creating the similarity matrix
    return (data, similarity)


def getAllMovies():
    data = pd.read_csv('main_data.csv')
    return list(data['movie_title'].str.capitalize())

def Recommend(movie):
    movie = movie.lower()
    try:
        data.head()
        similarity.shape
    except:
        (data, similarity) = createSimilarity()
    if movie not in data['movie_title'].unique():
        return semantic_search(movie)
    else:
        movieIndex = data.loc[data['movie_title'] == movie].index[0]
        lst = list(enumerate(similarity[movieIndex]))
        lst = sorted(lst, key=lambda x: x[1], reverse=True)
        lst = lst[1:20]  # excluding first item since it is the requested movie itself and taking the top20 movies
        movieList = []
        for i in range(len(lst)):
            a = lst[i][0]
            movieList.append(data['movie_title'][a])
        return movieList


app = Flask(__name__, static_folder='movie-recommender-app/build',
            static_url_path='/')
CORS(app)

@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    #returns all the movies in the dataset
    movies = getAllMovies()
    result = {'arr': movies}
    return jsonify(result)

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/similarity/<name>')
@cross_origin()
def similarity(name):
    movie = name
    recommendations = Recommend(movie)
    if type(recommendations) == type('string'):
        resultArray = recommendations.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)
    else:
        movieString = '---'.join(recommendations)
        resultArray = movieString.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
