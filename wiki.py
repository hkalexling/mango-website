import os
import shutil

dir_content = os.listdir('./docs/Wiki')
files = [f for f in dir_content if \
        os.path.isfile(os.path.join('./docs/Wiki', f)) and \
        f.endswith('.md') and \
        not f == 'README.md' ]

titles = [' '.join(os.path.splitext(f)[0].split('-')) for f in files]
path = ['/Wiki/{}'.format(os.path.splitext(f)[0]) for f in files]

new_lines = ['\t- [{}]({})\n'.format(t, path[i]) for (i, t) in enumerate(titles)]

shutil.copy2('./docs/sidebar.md', './docs/_sidebar.md')

lines = []
with open('./docs/sidebar.md', 'r') as f:
    lines = f.readlines()

matches = [idx for (idx, val) in enumerate(lines) if '- Wiki' in val]
if len(matches) == 0:
    raise ValueError('No line contains `- Wiki`')

idx = matches[0] + 1
lines[idx:idx] = new_lines

with open('./docs/_sidebar.md', 'w') as f:
    f.write(''.join(lines))
