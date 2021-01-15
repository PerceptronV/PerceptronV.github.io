---
layout: post
title:  "Introducing Scierra!"
date:   2021-01-14 20:01:12 +0800
categories: scierra
excerpt: a Simulated C++ Interpreter with Recurrent Adaptation.
---

<img src="{{ site.baseurl }}/assets/images/will-tarpey-F_7_6FPiDyM-unsplash.jpg" style="width: 100%; display: block; margin: auto;">

<div style="text-align: center; font-style: italic;">
<span>Photo by <a href="https://unsplash.com/@tarpey?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Will Tarpey</a> on <a href="https://unsplash.com/s/photos/snowy-mountain?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
</div> <br/>

Scierra is not a fishing company. Well, at least not this Scierra.

It is a **S**imulated **C**++ **I**nt**er**preter with **R**ecurrent **A**daptation.

In human words, it's a interactive interpreter for C++, which allows you to run and debug your program immediately as you type it.

But I didn't want just another C++ interpreter, like Cling - why install another unfamiliar infrastructure, only for that _one expression_ you need to verify now?

You see, I wanted Scierra to be a nice add-on feature, to run on nothing other than an installed compiler. _Any_ installed compiler. However, at the same time, it should offer all the additional benefits of an interpreter. That would make installation and usage a lot more lightweight and cleaner.

|   Essentially, I was thinking of a way __to build a C++ interpreter on top of a C++ compiler__.

But, how?

Now that's when the idea of _recurrent adaption_ comes in.

Scierra isn't techincally an interpreter, but it gives the illusion of one. Every time you complete a block of code, Scierra assigns that block to a particular location in the [anatomy](https://github.com/PerceptronV/scierra/blob/main/README.md#Anatomy-of-a-C-Program-in-Scierra) of your current C++ program. If you're declaring variables, then that will fall under the `main()` function. Otherwise, if you're defining functions, your block may be moved in front of `main()` into the `globals` section.

Then, Scierra compiles and runs your full C++ program. Every time.

|   Instead of maintaining the values of user-defined variables and the definitions of various functions, recurrent adaptation stores your whole program and recompiles it every time a new code block is typed in. That creates the illusion of an interpreter.

But there's other problems. To avoid clutter and to maintain the illusion of an interpreter, `cout` statements that have already been executed in the `main()` function will be removed. `cin` statements, on the otherhand, are a huge pain for implementing recurrent adaptation, and I'm still working to support those expressions.

Recurrent adaptation may sound slow, but overall Scierra works at a reasonable efficiency, unless you make it run a million-line code. But Scierra's mainly used for debugging and quick testing anyway, like what you'd do with the Python console, so I'd say it's good for its purpose.

Anyway, that's a high-level overview. There's a lot of little details ommitted, like Scierra's ability to detect whether you've completed a block of code, or how it understands whereabouts in a C++ program to insert that block. Recurrent adaption might seem like a simple idea, but overall everything works surprisingly well. I think it's a really helpful hand for testing and debugging in competitive programming!

Here is an example run of writing a C++ program in Scierra:

```c++
++> cout << "Hello, World!";
Hello, World!
++> int factorial(int n){

-->     if (n==1 || n==0)

-->         return 1;

-->     else return n * factorial(n-1);

--> }

++> cout << "10 factorial is: " << factorial(10);
10 factorial is: 3628800
```

Debug as you run, run as you type. Without installing another infrastructure.

Love the idea? Get started [here](https://github.com/PerceptronV/scierra/blob/main/README.md)!
