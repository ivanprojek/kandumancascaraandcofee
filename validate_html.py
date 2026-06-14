from pathlib import Path
from lxml import html as lxml_html
files=['index.html','contact.html','collection.html']
for f in files:
    p=Path(f)
    text=p.read_text(encoding='utf-8')
    print('===', f)
    try:
        lxml_html.fromstring(text)
        print('parsed ok')
    except Exception as e:
        print('ERROR:', e)
