install:
	bundle install
serve:
	bundle exec jekyll serve
venv:
	conda install virtualenv
	python3.9 -m venv env
