#!/bin/bash

cd docs
rm -rf Readme Wiki

git clone https://github.com/hkalexling/Mango
mkdir Readme
cp Mango/README.md Readme
cp -r Mango/public Readme
rm -rf Mango

git clone https://github.com/hkalexling/Mango.wiki Wiki
mv Wiki/Home.md Wiki/README.md

rm -rf Readme/.git Wiki/.git

cd ..
python3 wiki.py
