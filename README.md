# My Personal Page

## Build with [Jekyll](https://jekyllrb.com/)

I'm finding alternatives to create my personal page. I decide to start with Jekylls. I'm going to add the parts that I think that are important to my site.

**About Jekyll:** Jekyll is a static site generator. You give it text written in your favorite markup language and it uses layouts to create a static website. You can tweak how you want the site URLs to look like, what data gets displayed on the site, and more. Visit the [official page](https://jekyllrb.com/) for more.

# Setup

## Requirements
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/): version 4.4 or above
- [RubyGems](https://rubygems.org/pages/download)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/)
- [Bundler](https://rubygems.org/gems/bundler)

### Jekyll on Debian
Install the required dependencies:
  ```bash
  sudo apt install ruby-full build-essential zlib1g-dev
  ```

Set up a gem installation directory for your user account, so add environment variables to your ~/.bashrc file to configure the gem installation path.
  ```bash
  $ echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
  $ echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
  $ echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
  $ source ~/.bashrc
  ```

Finally, install Jekyll:
  ```bash
  gem install jekyll bundler
  ```


### Project setup

Install dependencies:
  ```bash
  bundle install
  ```

_Optional_: Into the project directory, builds the site and outputs a static site to a directory called \_site.
  ```bash
  jekyll build
  ```

Finally, in your project directory, build the site and make it available on a local server.
  ```bash
  bundle exec jekyll serve
  ```
> bundle exec jekyll serve if something wrong happen

After that, your project is running on http://127.0.0.1:4000/
