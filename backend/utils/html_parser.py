import os
from bs4 import BeautifulSoup

def extract_html_data(root_dir):
    all_docs = []

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    soup = BeautifulSoup(f, 'html.parser')

                    # Title fallback
                    title = soup.title.string.strip() if soup.title and soup.title.string else file

                    # Try best effort to extract all visible text
                    for script in soup(["script", "style", "noscript"]):
                        script.decompose()

                    body = soup.body or soup  # fallback in case <body> is missing
                    raw_text = body.get_text(separator="\n", strip=True)

                    content = raw_text if raw_text.strip() else "No readable content found."

                    # Infer user type from path
                    userType = "Citizen"
                    if "research" in path.lower():
                        userType = "Researcher"
                    elif "policy" in path.lower():
                        userType = "Policymaker"

                    all_docs.append({
                        "title": title,
                        "content": content,
                        "userType": userType
                    })
    return all_docs

