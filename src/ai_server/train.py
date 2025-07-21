import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense
import os

def train_and_save_model():
    """
    Loads the course data, builds the embedding model, generates embeddings,
    and saves the model and scaler.
    """
    data_path = os.path.join(os.path.dirname(__file__), 'dummycourses.csv')
    df_courses_original = pd.read_csv(data_path)

    numerical_cols = ['difficulty', 'length']
    genre_cols = [col for col in df_courses_original.columns if (col not in ['course_id'] + numerical_cols + ['course_name'])]

    df_course_processed = df_courses_original.copy()

    X_courses_genres = df_course_processed[genre_cols].values

    # Model definition
    genre_input = Input(shape=(len(genre_cols),), name='genre_input')
    hidden_layer_1 = Dense(128, activation='relu')(genre_input)
    hidden_layer_2 = Dense(64, activation='relu')(hidden_layer_1)
    course_embedding_output = Dense(32, activation='relu', name='course_embedding')(hidden_layer_2)

    course_embedding_model = Model(inputs=[genre_input], outputs=course_embedding_output)

    # Compile the model (important for saving/loading properly sometimes)
    course_embedding_model.compile(optimizer='adam', loss='mse')

    # Save the model
    model_save_path = 'course_embedding_model.keras'
    course_embedding_model.save(model_save_path)
    print(f"Model saved to {model_save_path}")

    # Save the embedding
    course_embeddings = course_embedding_model.predict([X_courses_genres])
    embeddings_save_path = 'course_embeddings.npy'
    np.save(embeddings_save_path, course_embeddings) # Save embeddings using numpy
    print(f"Course embeddings saved to {embeddings_save_path}")

    # Save genre_cols for consistent loading
    with open('genre_cols.txt', 'w') as f:
        for col in genre_cols:
            f.write(f"{col}\n")
    print("Genre columns saved to genre_cols.txt")

if __name__ == '__main__':
    train_and_save_model()