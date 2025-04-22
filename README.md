# Website

[Personal website for Philip](https://chophilip21.github.io/) Cho made with Hydejack Jenkyll. 

## Install ruby

```bash
sudo apt-get update
sudo apt-get install -y ruby-full build-essential zlib1g-dev
# (optional) to avoid installing gems as root:
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Install bundler and the rest.

```bash
gem install bundler

```
```bash
pip install --user virtualenv
python3.11 -m venv env
source env/bin/activate
make install
make serve
```
