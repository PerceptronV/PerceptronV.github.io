---
layout: post
title:  "Proving Unprovability: Gödel's First Incompleteness Theorem"
date:   2021-06-23 20:00:00 +0100
categories: mathematics logic
excerpt: Math is a discipline founded in the manipulation and application of basic axioms. But are a fixed set of exioms enough to prove all of math, or will there be theorems forever out of reach?
---

<head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
</head>

<img src="{{ site.baseurl }}/assets/images/pawel-czerwinski-rV8Hg07t61I-unsplash.jpg" style="width: 100%; display: block; margin: auto;">

<div style="text-align: center; font-style: italic;">
Photo by <a href="https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pawel Czerwinski</a> on <a href="https://unsplash.com/s/photos/hole?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
</div> <br/>

-----------------

<div style="text-align: center; font-style: italic; font-family: garamond; font-size: 1.5rem;">
“All Cretans are liars.” – Epimenides
</div>

-----------------

Math is a constructional miracle. An upside-down pyramid of sorts – top-heavy, yet miraculously stable and secure. At the bottom of the pyramid lies a simple set of rules that supports everything towering above: a group of axioms; simple truths taken for granted. Then, by manipulating these axioms in specific ways, we bootstrap together incredible theorems that form the bulk of our mathematical knowledge today. 

In this intuitive view, everything is so laid out and logical. It seems that by inputting a set of initial axioms and a defined list of rules for manipulating them, we could even write a computer program that will rediscover all we know of math. After all, math comes down to the repeated application of simple rules; and with a good enough program, there is no reason why a computer shouldn’t be capable of applying these to generate new theorems. Indeed, it seems logical that eventually, this program will exhaust all we will ever know of math.

This idea, that given a comprehensive enough set of axioms for a system we can prove all true mathematical statements about that system, is known as completeness in mathematics. It is a very intuitive concept, and perhaps is what our faith in maths is grounded in. After all, if math is incomplete, what if some of the most important conjectures that we are currently working on is not provable? Surely, math must be complete.

Well… it would have been if not for Gödel. As it turns out, in his First Incompleteness Theorem (published in 1931), there will always be true statements about that system which cannot be proven from just the axioms. And if we add that unprovable true statement as an axiom in a new system, there will still be new unprovable statements, and so on. However many axioms we discover and include in math, there will forever be true expressions that are out of reach based solely on the axioms. This renders the idea of a simple computer program ‘exhausting math’ impossible, as there are simply more truths to be found and more axioms to be added. It is important to note here that this does not spell the death of math. Rather, echoing the view of Sir Roger Penrose, it simply means that sometimes, to go forward in mathematics requires an understanding outside of the mathematical system that you are working in. 

So, how did Gödel do this, proving the unprovability of certain statements in an axiomatic system? In the following paragraphs, I will present an outline of Gödel’s proof. Essentially, there are two steps to the process: changing statements to numbers, and self-referencing.

Gödel’s key insight was to represent mathematical statements using math, hence turning concepts about a mathematical system into a sequence of numbers which can then be reasoned about in that mathematical system. Because the way in which symbols are represented is arbitrary from a meta-mathematical point of view, and all mathematical statements in a system essentially consists of symbols (e.g. ‘\\(¬\\)’ meaning not, ‘\\(∨\\)’ meaning or, ‘\\(∀\\)’ meaning for all, ‘\\(0\\)’ meaning zero), Gödel assigned to each symbol a Gödel number. Here is a simplified table of the Gödel numbers for common symbols, based on a slightly modified version of Gödel’s original scheme <sup><a href='#foot1' id='ref1'>[1]</a></sup>: 
 

| **Symbol** |    **Meaning**    | **Gödel Number** |
| :--------: | :---------------: | :--------------: |
|  \\(¬\\)   |        Not        |        1         |
|  \\(∨\\)   |        Or         |        2         |
|  \\(=\\)   |      Equals       |        5         |
|  \\(0\\)   |       Zero        |        6         |
|  \\(S\\)   | The successor  of |        7         |
|  \\(+\\)   |       Plus        |        11        |


Moreover, each mathematical expression also has its own Gödel number. This is calculated as the product of consecutive prime numbers raised to the power of the Gödel number of the symbol. Here is an example.

Suppose we have an expression: \\(0 = 0 + 0\\). The corresponding sequence of Gödel numbers is then \\(\left[6,\,5,\,6,\,11,\,6\right]\\). To create a unique Gödel number for each sequence of symbols, Gödel exploited the fact that every natural number greater than 1 can only have one unique prime factorisation (also called the Fundamental Theorem of Arithmetic). Hence, the Gödel number of above statement is:

\\[
    2^6 \times 3^5 \times 5^6 \times7^{11} \times{11}^6 = 851218050943864989000000
\\]

This example also helps illustrate the unique power of Gödel numbers. We can now reason about abstract concepts just by reasoning about natural numbers. For instance, the concept of “*an equation with \\(0\\) on the L.H.S.*” can be mathematically defined as “*A statement such that there exists some integer \\(x\\) which makes \\(\left(2^6\times3^5\right)\, x\\) the Gödel number of the statement, but there does not exist an integer \\(x\\) which makes \\(\left(2^7\times3^6\right)\, x\\) the Gödel number of the statement*”. Our example above fulfils this criterion. Going further, Gödel numbers can also be used to define the concepts of ‘formula’, ‘proof schema’, and ‘provable formula’ in purely mathematical terms. Moreover, employing a similar technique, proofs can be assigned Gödel numbers, too. Since proofs are essentially just a sequence of expressions, their Gödel numbers are calculated as the product of consecutive primes raised to the power of the Gödel number of an expression. 

Now comes the fun. I am sure that many of us are familiar with Epimenides’ famous liar’s paradox. As a Cretan himself, he reportedly said “All Cretans are liars”. The trick is of course, if we take what he said as true, then all Cretans must lie, and hence Epimenides must lie, thus what he had said was false; but if what he had said was false, then all Cretans must be truthful, and hence whatever he had said must also be true! Many such paradoxes stem from self-referential statements, and it is precisely this that Gödel was able to manipulate, creating a statement which can neither be proven nor disproven by axioms.

Let us call a formula which takes exactly one natural number as a variable a *doughnut formula* (because doughnuts take exactly one natural hole). We can also define a kind of ordering for *doughnut formulae*, with the \\(n^{th}\\) *doughnut formula* denoted \\(R_n\\). Note that both the concept of a *doughnut formula* and the relation for ordering these formulae (\\(R\\)) can be defined by mathematical statements about their Gödel numbers. 

Now, we define a set \\(K\\), which is the set of numbers \\(n\\) such that the *doughnut formula* \\(R_n\left(n\right)\\) is unprovable. As a companion to that, we further define a function \\(S\\), which takes in a natural number \\(n\\), and asserts that it belongs to \\(K\\) (by referring to properties of the Gödel number of \\(K\\)). However, since \\(S\\) takes in exactly one natural number as a variable, it is also a *doughnut formula*. Thus there must be some integer \\(q\\) such that the *doughnut formula* \\(R_q\\) is equivalent to \\(S\\). And congratulations! The innocent-looking statement which we have just constructed, \\(R_q\left(q\right)\\), is in fact unprovable within an axiomatic system.

Why? Well, because \\(R_q\left(q\right)=S\left(q\right)\\), therefore \\(q\in K\\), and hence \\(R_q\\) is unprovable. In other words, \\(R_q\left(q\right)\\) is a statement which states ‘This statement is not provable’. So, if \\(R_q\left(q\right)\\) is false, then it must be provable. But if something is provable, it must be true! Hence to avoid this contradiction, \\(R_q\left(q\right)\\) must be true – meaning that it is unprovable. 

This echoes the liar’s paradox, but it is in no way just a linguistic trick. Because the statement \\(R_q\left(q\right)\\) essentially translates into a statement about natural numbers, Gödel’s theorem demonstrates a fundamental incompleteness in our attempts to prove theorems in a programmatic way. Additionally, forty-six years after Gödel’s initial publication, Jeff Paris and Leo Harrington published the Paris–Harrington theorem, demonstrating how a natural-looking mathematical postulate is in fact unprovable in a standard system of axioms.

Gödel’s first incompleteness theorem is an intriguing aspect of math, but has so many implications beyond it. It set limits on computability and has even influenced the philosophy of consciousness. Given that humans can prove Gödelian-unprovable statements, Sir Roger Penrose has suggested that the human mind is more than just computation on an axiomatic system, and hence consciousness cannot be reduced to simple computation. If this view is correct, then perhaps we shall never achieve human-like general intelligence with present-day computing technology. And while this may be frustrating to some, it is also exhilarating that there could be something unexplainable and mysterious about humans’ understanding of math, setting us apart from just axiom manipulators, and allowing us to bypass Gödel’s unsettling incompleteness theorem. 

#### Footnotes

<a href='#ref1' id='foot1'><b>[1]</b></a> Based on table from "Gödel's Proof", Ernest Nagel and James R. Newman, *pub. 1958, New York University Press*

#### References

1. ["How Gödel’s Proof Works", Natalie Wolchover on Quanta Magazine, July 2020](https://www.quantamagazine.org/how-godels-incompleteness-theorems-work-20200714/)

2. ["On formally undecidable propositions of Principia Mathematica and related systems I", Kurt Gödel, *pub. 1931*, *ed. trans. Martin Hirzel 2000*](https://hirzels.com/martin/papers/canon00-goedel.pdf)
