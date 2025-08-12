import csv, uuid, os
from fpdf import FPDF

TEMP_DIR = "./temp_downloads"
os.makedirs(TEMP_DIR, exist_ok=True)

def flatten(text):
    return " ".join(text.split()) if text else ""

def to_csv(data):
    filename = f"{uuid.uuid4().hex}.csv"
    path = os.path.join(TEMP_DIR, filename)

    with open(path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Title", "Content", "UserType"])
        for row in data:
            writer.writerow([
                flatten(row["title"]),
                flatten(row["content"]),
                row["userType"]
            ])

    return filename

def to_pdf(data):
    filename = f"{uuid.uuid4().hex}.pdf"
    path = os.path.join(TEMP_DIR, filename)

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)

    for row in data:
        title = flatten(row["title"])
        content = flatten(row["content"])
        pdf.multi_cell(0, 10, f"{title}\n\n{content}\n\n---\n")

    pdf.output(path)
    return filename
