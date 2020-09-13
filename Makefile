docs/_sidebar.md: docs/Readme/README.md | docs/Wiki/README.md
	python3 wiki.py

docs/Readme/README.md:
	cd docs && rm -rf Readme && git clone https://github.com/hkalexling/Mango Readme && rm -rf Readme/.git

docs/Wiki/README.md:
	cd docs && rm -rf Wiki && git clone https://github.com/hkalexling/Mango.wiki Wiki && rm -rf Wiki/.git
