docs/_sidebar.md: docs/Readme/README.md | docs/Wiki/README.md
	python3 wiki.py

docs/Readme/README.md:
	cd docs && git clone https://github.com/hkalexling/Mango Readme

docs/Wiki/README.md:
	cd docs && git clone https://github.com/hkalexling/Mango.wiki Wiki
