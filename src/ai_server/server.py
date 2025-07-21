import pandas as pd
import numpy as np # Import numpy
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

df_courses_original = None
course_embedding_model = None
course_embeddings = None # Initialize as None globally
numerical_cols = ['difficulty', 'length']
genre_cols = []

def load_data_and_model():
    """
    Loads the course data, pre-trained embedding model (optional if only using pre-saved embeddings),
    pre-saved embeddings, and scaler.
    This function will be called once when the server starts.
    """
    global df_courses_original, course_embedding_model, course_embeddings, genre_cols # Declare all global variables at the start

    data_path = os.path.join(os.path.dirname(__file__), 'dummycourses.csv')
    df_courses_original = pd.read_csv(data_path)

    with open('genre_cols.txt', 'r') as f:
        genre_cols = [line.strip() for line in f]

    # Load pre-saved course embeddings
    embeddings_load_path = 'course_embeddings.npy'
    try:
        course_embeddings = np.load(embeddings_load_path) # This assignment is now fine
        print(f"Course embeddings loaded from {embeddings_load_path}")
    except FileNotFoundError:
        print(f"Error: {embeddings_load_path} not found. Ensure train.py was run.")
        # Fallback: if embeddings are not found, try loading the model and generating them
        model_load_path = 'course_embedding_model.keras'
        try:
            course_embedding_model = load_model(model_load_path)
            df_course_processed = df_courses_original.copy()
            X_courses_genres = df_course_processed[genre_cols].values
            course_embeddings = course_embedding_model.predict([X_courses_genres])
            print("Generated embeddings using the loaded model (embeddings file not found).")
        except Exception as e:
            print(f"Error loading model or generating embeddings: {e}")
            course_embeddings = None # This assignment is also fine now

    print("Data and model (or embeddings) loaded successfully!")

def recommend_courses_content_based(course_id, df_courses, embeddings_array, top_n=5):
    """
    Recommends courses based on content similarity using deep learning embeddings.
    """
    try:
        idx = df_courses[df_courses['course_id'] == course_id].index[0]
    except IndexError:
        return pd.DataFrame()

    query_embedding = embeddings_array[idx].reshape(1, -1)

    similarities = cosine_similarity(query_embedding, embeddings_array).flatten()
    # Get top_n + 1 because the course itself will be in the similarities
    similar_indices = similarities.argsort()[-(top_n + 1):][::-1]
    # Filter out the course itself
    similar_indices = [i for i in similar_indices if i != idx][:top_n]

    recommended_courses = df_courses.iloc[similar_indices].copy()
    recommended_courses['similarity'] = similarities[similar_indices]

    return recommended_courses.sort_values(by='similarity', ascending=False)

# --- Flask Endpoints ---

@app.route('/')
def home():
    return "Welcome to the Course Recommendation API! Use /recommend_course endpoint."

@app.route('/recommend_course', methods=['GET'])
def recommend_course_endpoint():
    """
    Endpoint to get content-based course recommendations.
    Expected query parameters:
    - course_id: The ID of the course to get recommendations for. (e.g., '1')
    - top_n: (Optional) The number of recommendations to return. Default is 5. (e.g., 5)
    Example: /recommend_course?course_id=1&top_n=5
    """
    course_id_str = request.args.get('course_id')
    top_n_str = request.args.get('top_n', '5')

    if not course_id_str:
        return jsonify({"error": "Missing 'course_id' parameter."}), 400

    try:
        course_id = int(course_id_str)
    except ValueError:
        return jsonify({"error": "'course_id' must be an integer."}), 400

    try:
        top_n = int(top_n_str)
        if top_n <= 0:
            raise ValueError
    except ValueError:
        return jsonify({"error": "'top_n' must be a positive integer."}), 400

    if df_courses_original is None or course_embeddings is None:
        return jsonify({"error": "Data or embeddings not loaded. Please ensure train.py was run and restart the server if this persists."}), 500

    # Get the name of the queried course
    queried_course_name = None
    queried_course_row = df_courses_original[df_courses_original['course_id'] == course_id]
    if not queried_course_row.empty:
        queried_course_name = queried_course_row['course_name'].iloc[0]


    recommendations_df = recommend_courses_content_based(
        course_id,
        df_courses_original,
        course_embeddings,
        top_n
    )

    if recommendations_df.empty:
        if queried_course_name:
            return jsonify({"message": f"Course ID '{course_id}' (Name: '{queried_course_name}') not found in the dataset or no recommendations available."}), 404
        else:
            return jsonify({"message": f"Course ID '{course_id}' not found in the dataset."}), 404
    else:
        # Define the columns you want to keep in the recommendations
        desired_columns = ['course_id', 'course_name', 'difficulty', 'length', 'similarity']

        # Filter the DataFrame to include only the desired columns
        # Ensure 'similarity' is present before dropping other columns
        if 'similarity' in recommendations_df.columns:
            # Select only the desired columns
            simplified_recommendations_df = recommendations_df[desired_columns]
        else:
            # Fallback if similarity isn't somehow there (shouldn't happen with current code)
            simplified_recommendations_df = recommendations_df[['course_id', 'course_name', 'difficulty', 'length']]


        # Convert DataFrame to a list of dictionaries for JSON response
        recommendations_list = simplified_recommendations_df.to_dict(orient='records')

        return jsonify({
            "queried_course": {
                "course_id": course_id,
                "course_name": queried_course_name
            },
            "recommendations": recommendations_list
        })

# --- Server Start ---
if __name__ == '__main__':
    # Load data and model when the application starts
    load_data_and_model()
    # Run the Flask app
    # Use host='0.0.0.0' to make it accessible externally
    app.run(debug=True, host='0.0.0.0', port=5000)