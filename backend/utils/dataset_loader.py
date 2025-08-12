import pandas as pd

def load_and_filter_data(query: dict):
    df = pd.read_csv('data/sample_dataset.csv')

    for key, value in query.items():
        if key not in df.columns:
            raise Exception(f"Column '{key}' not found in dataset")
        df = df[df[key] == value]

    return df.to_dict(orient="records")
