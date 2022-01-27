---
layout: post
title:  "Introducing Dodocode: A Pseudocode-to-Python transpiler"
date:   2021-09-19 21:30:00 +0800
categories: dudocode langs
excerpt: Dudocode is a pseudocode-to-Python transpiler based on the format specified in CIE IGCSE (Syllabus 0478), complete with CLI and an interactive console
---

<img src="{{ site.baseurl }}/assets/images/osman-rana-Oi1fJwi35oI-unsplash.jpg" style="width: 100%; display: block; margin: auto;">

<div style="text-align: center; font-style: italic;">
<span>Photo by <a href="https://unsplash.com/@osmanrana?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Osman Rana</a> on <a href="https://unsplash.com/s/photos/boat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
</div> <br/>

## Motivation

Pseudocode is not meant to be run, like real code. That's why it's called *pseudocode*.

But take a moment. Suppose we are able to truly run pseudocode source code. Then what? Well, it would obviosuly be good fun! It's like having the ability to turn any pen and pencil drawing into a real-life object! That in itself should be exciting enough. On the other hand, it would also be a great way to get to grips with pseudocode. This is especially important in educaton, where students would find it much more intuitive and interactive to learn this core technique by getting hands on, rather than just ploughing through an endless stack of past paper questions. Reading code is hard enough; reading an un-runnable code is even tougher on students.

## The Project

You might see where this is headed now.

| All these reasons drove me to create **Dudocode, a fully-fledged Pseudocode-to-Python transpiler**. It runs any pseudocode programs which adhere to the syntax specified in CIE IGCSE Syllabus 0478 (cloned specification [here](https://github.com/PerceptronV/dudocode/blob/main/pseudocode_specification.pdf)). On top of offering the capabilities of transpiling and running pseudocode source code via a CLI, Dudocode also has an interactive console, maing it easy to ideate and debug.

Oh, and did I mention it also comes with a language integration package for Notepad++? This extends supports syntax highlighting, code autocompletion, and code folding for pseudocode. It is my vision that this mostly-complete ecosystem will be used to help teach pseudocode in my school (and maybe even others!) in the years to come. This would make a tangible impact and really add value to the project. I'm in conversation with my teachers; but no guarantees yet!

Below is an example piece of pseudocode program running on Dudocode, computing all the prime numbers up to 100 via the Sieve of Eratosthenes!

<div style="text-align: center;">
<b>Source code</b>
</div>

```c++
INPUT Limit

DECLARE IsPrime : ARRAY[2:Limit] OF BOOLEAN

// Initialise array
FOR Number ← 2 TO Limit
    IsPrime[Number] ← TRUE
NEXT Number

FOR Number ← 2 TO Limit
    IF IsPrime[Number] = TRUE
      THEN
        // Print Number if it is prime
        OUTPUT Number, " "
        
        // Then mark all its multiples as not prime
        FOR Multiple ← 2 TO DIV(Limit, Number)
            IsPrime[Number * Multiple] ← FALSE
        NEXT Multiple
    ENDIF
NEXT Number
```

<div style="text-align: center;">
<b>Execution Result</b>
</div>

```shell
> 100
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 
```

<div style="text-align: center; font-style: italic;">
<span>More sample programs like this are available on the project's <a href="https://github.com/PerceptronV/dudocode">GitHub repository</a>.</span>
</div> <br/>

As you can see, Dudocode supports a variety of pseudocode expressions, from simple arithmetic to array declarations, logic statements, and loop statements. Currently, the only feature in the syllabus that has yet to be implemented is filestream handling, which hopefully will be addressed in the near future. 

## How it Works

In terms of how Dudocode works, there are two main components.

| Firstly, there is a library of custom-built objects, functions and macros designed to natively implement some pseudocode features. Secondly, there are a set of functions which manipulate pseudocode expressions into their Pythonic equivalent. 

These are explained in further detail below.

### Custom Objects, Functions, Macros

The bulk of the custom-built library is dedicated to writing pseudocode-specific Pythonic objects. For example, consider the following pseudocode program:

```c++
INPUT Num
OUTPUT Num + 10
```

In a naïve implementation of Dudocode, the above would return an error, despite being a perfectly legitimate pseudocode program. Why? Because Python inputs are statically typed (they can only be `string`), why pseudocode inputs are dynamically typed. 

### Syntax Mapping

## Some Last Thoughts
