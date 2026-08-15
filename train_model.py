import os

os.environ["OMP_NUM_THREADS"] = "4"

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

DATA = "data/fertilizer_dataset.csv"
MODEL = "model/fertilizer_model.pkl"

df = pd.read_csv(DATA)
print(df["Fertilizer Name"].value_counts())
print(f"Shape: {df.shape}")

X = df.drop(columns=["Fertilizer Name"])
y = df["Fertilizer Name"]

cat_cols = ["Soil Type", "Crop Type"]
encoders = {}
for col in cat_cols:
    enc = LabelEncoder()
    X[col] = enc.fit_transform(X[col])
    encoders[col] = enc

joblib.dump(encoders, "model/encoders.pkl")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42,
    n_jobs=-1,
)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Test accuracy: {acc:.4f}")
print(classification_report(y_test, y_pred, digits=2))

importances = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
print("\nFeature importance:")
print(importances)

joblib.dump(model, MODEL)
print(f"Model saved -> {MODEL}")
