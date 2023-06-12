install:
	git clone https://github.com/piharpi/jekyll-klise.git	
	cd jekyll-klise
	bundle install
serve:
	source env/bin/activate
	bundle exec jekyll serve