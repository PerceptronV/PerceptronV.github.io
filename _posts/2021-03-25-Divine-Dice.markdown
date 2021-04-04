---
layout: post
title:  "The Divine Dice: A Brief Note on Determinism in Quantum Mechanics and Bell’s Inequalities"
date:   2021-03-25 01:30:00 +0800
categories: physics quantum
excerpt: Just how is quantum mechanics non-deterministic? Why is it disturbing? And... how can we possibly eliminate the possibility of something we don't even know about? 
---

<head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js"></script>
</head>

<img src="{{ site.baseurl }}/assets/images/anton-maksimov-juvnsky-hlc-O87pjUs-unsplash.jpg" style="width: 100%; display: block; margin: auto;">

<div style="text-align: center; font-style: italic;">
<span>Photo by <a href="https://unsplash.com/@juvnsky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Anton Maksimov juvnsky</a> on <a href="https://unsplash.com/s/photos/quantum-mechanics?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>
</div> <br/>

*Editor's note: This is only a primer to the topic. For those interested in understanding further, there are links at the bottom!*

It is often said that quantum mechanics is not deterministic. But why exactly is this? And just how disturbing is it actually? This brief article seeks to illustrate non-determinism in quantum mechanics via quick example, and leading on from that, discuss the significance of Bell’s Inequalities.

Imagine a football. If you kick it at exactly the same speed, angle and direction, it will always travel in the same trajectory (with other factors remaining constant, of course). If you insert a brick wall in the middle of its path, it will also deflect off it in the same way if all the initial conditions are the same. Now, imagine a machine which only accepts a football travelling in a certain direction. It is clear to us, from our classical perspective, that if you stand at the same spot and shoot a football in an identical manner, what happens to it is deterministic. That is to say, regardless of how many times you kick it, the football will always end up at the same spot. The machine either accepts it or it doesn’t. It simply cannot accept or reject the ball with a probability. For example, it cannot only accept the football half of the time, because there is nothing inherently random about the system. After all, once we know all the initial conditions of a system, shouldn’t it always progress in a specific way? Well, you might think so – but that’s not necessarily how things work in the quantum world.

Imagine a quantum ‘ball’, say, a photon. Many of these photons together form a beam of light, and light has a special property: polarisation. You can think of this as the direction of its electric field. Additionally, there is a special piece of equipment called a polariser. This only allow passage of light waves of specific polarisation. Before we move on, it’s useful to note the wave-particle duality of light. That is, light can both be interpreted as an electromagnetic wave or as a particle, as it exhibits properties of both. We can choose either one for our thought experiment below, depending on when it is handy to do so. 

For our purposes here, let’s first imagine a polariser which only allows waves polarised in the x-axis (\\(\hat{x}\\)) to pass through.<sup id="note1">[[1]](#foot1)</sup>  Suppose that we also have a beam of light, which is polarised in a direction that forms an angle \\(\alpha\\) with the x-axis. Now, since this beam of light represents an electric field, let’s assume that it has a magnitude of \\(E_0\\). By the laws of electromagnetism, the magnitude of the electric field can be expressed as the sum of its components:

\\[
    E_\alpha = E_0 \, cos \, \alpha \, \hat{x} + E_0 \, sin \, \alpha \, \hat{y}
\\]

Since all components of the electric field that is polarised in the y-axis is rejected by the polariser, the new electric field that exits is:

\\[
    E=E_0\, cos\, \alpha\, \hat{x}
\\]

Since the energy of an electromagnetic wave is proportional to the square of the magnitude of its field, we see that only a fraction of the original energy of the wave passes through. Precisely, this fraction is \\(\left(cos\, \alpha\right)^2\\). 

Even though it may not seem so at first, this is a great discovery, and leads directly to non-determinism. For one, the energy of light depends only on its colour and brightness. And since polarisers do not change a light’s colour, as we can verify in experiments, to account for this loss of energy, the brightness of the light exiting the polariser must therefore decrease. This also means that only a fraction of the photons are passing through the polariser.

But if all the photons are identical, why should the polariser accept some while rejecting others? It sounds strange… It’s just like kicking a football at the same position and at the same speed, yet seeing it land in a different position each time. But this is the nature of quantum mechanics. Everything is inherently non-deterministic. Even if you control a system such that it has the same conditions, what you get from measuring it is not necessarily always the same.

It is all quite a lot to take in, and there has been many theories that have since been proposed to deal with (and evade) this seemingly absurd conclusion. One of these is the hidden variables theory. Essentially, it states that there is something more to the system that we don’t yet know about. There are some hidden variables in each photon, that if only you knew them, would allow you to predict, with accuracy and not probability, whether they will pass through the polariser. This is a very tempting response, particularly supported and developed by Einstein, and for a long time there was nothing that could be done to either prove or disprove it. After all, how can you try to prove the non-existence of something we have no idea about?

In about the 1960s, a brilliant physicist called John Bell invented a way to do exactly so. He demonstrated a setup where the predictions of hidden variables theory and quantum mechanics would disagree. Here’s a simple overview.
Suppose that we have two objects: Object 1 and Object 2, each possessing identical properties. We can measure three of these properties; let’s call them A, B, and C. Note that these properties measure either 0 or 1. No any other value is possible. Now let \\(P_{same}\left(X,Y\right)\\) denote the possibility that property X of Object 1 equals property Y of Object 2. If we assume, according to hidden variables theory, that the properties of these objects are determined prior to measurement (i.e. the existence of hidden variables), and that communication between these two objects cannot happen quicker than the speed of light (i.e. locality), than the following inequality holds:

\\[
    P_{same}\left(A,B\right) + P_{same}\left(A,C\right)+P_{same}\left(B,\ C\right) \geq 1
\\]

However, evaluating this for a quantum system would give:

\\[
    P_{same}\left(A,B\right) + P_{same}\left(A,C\right)+P_{same}\left(B,\ C\right) =\frac{3}{4}
\\]

which disagrees with the predictions of hidden variables theory.

This is important because finally, it allows us to directly compare the predictions of quantum of mechanics with that of the hidden variables theory. And behold – numerous experiments have been carried out over the years, with the first loophole-free test completed in 2015. Yet they have all, unanimously, confirmed the quantum mechanical interpretation. This means that either the state of a system can never be determined before it is measured, or that faster-than-light communication is possible.

While either of these results seem to defy common sense, isn’t that what’s so beautiful about physics? I certainly feel a sense of awe, not only at John Bell for inventing the theory behind these experiments, but also to how exotic the world we live in truly is. And perhaps it is not the world that is irrational; maybe the irrationality lies in the way we, as beings in a classical deterministic universe, perceive the microscopic world.

<br/>

<sup id="foot1">[[1]](#note1)</sup>: To the following illustration I am indebted to Professor Barton Zwiebach in 8.04 Quantum Physics I. Spring 2016, Massachusetts Institute of Technology, available on MIT OpenCourseWare.

## Further Reading

1. [A simple proof of Bell's inequality, Lorenzo Maccone, 2012 on ArXiv](https://arxiv.org/abs/1212.5214)

2. [8.04 Quantum Physics I, Barton Zwiebach, Spring 2016 on MIT OpenCourseWare](https://ocw.mit.edu/courses/physics/8-04-quantum-physics-i-spring-2016/)

3. Quantum Mechanics: The Theoretical Minimum, by Leonard Susskind and Art Friedman, pub. 2014

I have a copy of the theoretical minimum book myself, which I'm still reading through. Trust me, it's fabulous - giving you the juciest parts of QM in a comprehensive overview!

