---
layout: post
title: Applying basic math concepts using Numpy-Part 1
date: 2023-01-29 01:00 +0700
modified: 2023-02-21 16:49:47 +07:00
description: Learn how to apply basic mathematics operations using Python library
tag:
  - math
  - python
  - basics
  - numpy
image: https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg
---

Machine Learning (ML) applications are most commonly written in Python, but every single concepts involoved in it is based on Mathematics. Math is the engine of ML application, and the Python codes are its wheels. Without knowing them both in detail, all the way from the fundamentals, you cannot say that you are truly a ML Engineer. On these blog mosts related to basics, I aim to explain basic Linear Algebra, Probability concepts, and then solidify the understanding by applying some of the popular libraries like `Numpy`, `Scipy` and `Pytorch`, which are most widely used in this field.             

The code that are used in this repository will go into this [notebook](_posts/first-post/matrices.ipynb)

### Melalui Github (boring way) 💻

1. Buka repo yang hasil fork di Github.
1. Klik **Pull Requests** di sebelah kanan, lalu **New Pull Request**.
1. Akan memunculkan hasil compare antara repo upstream dengan repo kamu(forked repo), dan jika menyatakan "There isn’t anything to compare.", tekan link **switching the base**, yang mana sekarang repo kamu(forked repo) akan dibalik menjadi base repo dan repo upstream menjadi head repo.
1. Tekan **Create Pull Request**, beri judul pull request, Tekan **Send Pull Request**.
1. Tekan **Merge Pull Request** dan **Confirm Merge**.

\* _pastikan kamu tidak merubah apapun pada forked repo, supaya melakukan merge secara otomatis, kalo tidak ya paling2 konflik._

### Melalui terminal ⌨️

Tambahkan remote alamat repository yang aslinya disini tak beri nama `upstream`., ganti `ORIGINAL_OWNER` dan `ORIGINAL_REPO` dengan alamat repo aslimu.

```bash
$ git add remote upstream git@github.com:ORIGINAL_OWNER/ORIGINAL_REPO.git
$ git remote -v
> origin    git@github.com:piharpi/www.git (fetch) # forked repo
> origin    git@github.com:piharpi/www.git (push) # forked repo
> upstream    git@github.com:ORIGINAL_OWNER/ORIGINAL_REPO.git (fetch) # upstream repo / original repo
> upstream    git@github.com:ORIGINAL_OWNER/ORIGINAL_REPO.git (push) # upstream repo / original repo
```

Checkout ke local branch `master`.

```bash
$ git checkout master
> Switched to branch 'master'
```

Jika sudah, Merge local repo dengan remote `upstream/master`.

```bash
$ git merge upstream/master
```

Terakhir push local repo ke remote `origin`.

```bash
$ git add -A
$ git commit -m "updating origin repo" && git push -u origin master
```

Selamat mencoba cara ribet ini, semoga bisa dipahami, saya sendiri lebih senang melalui terminal, klo ada yang ribet kenapa cari yang mudah.

##### Resources

- [Syncing a fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
- [Update your fork directly on Github](https://rick.cogley.info/post/update-your-forked-repository-directly-on-github/#top)
