---
title: 'Install Ruby on Mac OS with M2 Chip'
date: '2024-04-17'
excerpt: 'Learn how to install older Ruby versions on Mac OS Sonoma with M2 chip using asdf version manager. A practical guide for developers working with legacy Ruby projects.'
readTime: '5 min read'
tags: ['Ruby', 'macOS', 'Development Environment', 'asdf', 'M2 Chip']
author: 'Geovanny Cordero Valverde'
---

How to install ruby on Mac OS Sonoma with the M2 chip?

Recently, I was working on a project where I require to use an old version of ruby, it was ruby `2.7.4` . I try to
install this version using `rvm` and `rbenv` without success.

After some research I finally found a tool that works for my and the ruby version I was trying to install, this tool is
called `asdf` .

### How to install asdf

There are different ways to get `asdf` listed in the [official page](https://asdf-vm.com/guide/getting-started.html),
but I did it using git.

Open your terminal and run the following command:

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
```

Then, to install it there is again a lot of different ways, but I decided to add it as a plugin to my previous installed
program oh-my-zsh (that I highly recommend to use in mac).

Just add it to to the `plugins` definition in the `~/.zshrc` . In my case I was already using the `git` plugin so it
looks as follows, separated by an space:

```bash
plugins=(git asdf)
```

You can check the official instructions [here](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/asdf).

Close and open a new terminal or run `source ~/.zshrc` to update your configuration and you should be able to use `asdf`
now.

### Ruby with `asdf`

First, add ruby as a plugin and then install the required version

```bash
$ asdf plugin add ruby
$ asdf install ruby 2.7.4
$ asdf global ruby 2.7.4

# Update to the latest Rubygems version
$ gem update --system
```

Confirm that you have ruby installed:

```bash
$ which ruby
~/.asdf/shims/ruby
$ ruby -v
ruby 2.7.4p191 (2021-07-07 revision a21a3b7d23) [arm64-darwin23]
```

Install rails

```bash
asdf exec gem install rails
```

You can also install NodeJS using `asdf` but for now I’ll continue using `nvm`.
