import pandas as pd
import numpy as np
import pickle
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, render_template, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer


movies = pd.read_csv('main_data.csv')


movies['comb'] = movies['comb'].fillna('')
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(movies['comb'])
cosine_sim = cosine_similarity(tfidf_matrix)


def semantic_search(query):
    query_tfidf = tfidf.transform([query])
    cosine_scores = cosine_similarity(query_tfidf, tfidf_matrix).flatten()
    cosine_scores_df = pd.DataFrame({'cosine_score': cosine_scores, 'movie': movies['movie_title']})
    ranked_movies = cosine_scores_df.sort_values('cosine_score', ascending=False)
    return ranked_movies


query = 'kids movie'
results = semantic_search(query)
print(results.head(10))