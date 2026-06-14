import re
from pathlib import Path
root = Path(r'd:\1. porto\5.projek web\Merapi kopi')
keys = set()
for f in ['contact.html', 'collection.html', 'index.html']:
    text = (root / f).read_text(encoding='utf-8')
    keys |= set(re.findall(r'data-i18n="([^"]+)"', text))
js = (root / 'assets/js/main.js').read_text(encoding='utf-8')
js_keys = set(re.findall(r"'([^']+)':", js))
missing = sorted(k for k in keys if k not in js_keys)
print('HTML keys:', len(keys))
print('JS keys:', len(js_keys))
print('Missing keys:', missing)
