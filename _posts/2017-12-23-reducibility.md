---
layout: post
title: Polynomial Time Reductions
---

{% include katex.html %}

Abstract: this post gives a quick overview of polynomial time reductions – a method for computationally cheap transformations of problems into different problems. Chiefly, it's used to prove that some problems are at least as hard as the other ones, which taps into the discussion of **P** vs **NP** problem.

## Simple problems and hard problems

Let's divide all computational problems into two sets: the simple problems and the hard ones. The simple problems are those for which there exists (at least hypothetically) an algorithm that solves them in time polynomial from the size of the input. The hard problems are those for which there does not (and cannot) exist such an algorithm.

An example of a simple problem is the following:

>You are given a sequence of numbers. Is the sequence increasing?

One algorithm for this problem is to go along the sequence and compare neighboring numbers. If in all comparisons the number to the left is smaller than the number to the right, then the sequence is indeed increasing. In total, there are $$ n-1 $$ comparisons.

An example of a hard problem is the following:

>You are given a program. Does it halt within $$ k $$ steps?

$$ k $$ encoded in binary uses $$ \text{ln}(k) $$ bits, yet a trivial simulation of the program takes $$ k $$ steps. This means that for an input of length $$ e^{\text{ln}(k)}=k $$ the simulation will take $$ e^k $$ steps and that this problem can only be solved in exponential time.

## The clique problem

Now, suppose we have the following problem:

>Does there exist a clique (a set of vertices in a graph such that its every vertex is connected to its every other vertex) of size $$ n $$ in a given graph?

We'll call this problem $$ C $$ and we want to know if it's simple or hard, i.e. we need to prove that $$ C $$ is either simple or hard.

If $$ C $$ is simple, then, by definition of a simple problem, there exists a polynomial time algorithm for it. And by finding such an algorithm we would prove that $$ C $$ is simple.

But if $$ C $$ is hard, then to prove this fact we would have to prove that there cannot possibly exist a polynomial time algorithm, which is intuitively a much more difficult task.

## Polynomial time reductions

There exists a walkaround for the second case, though.

Let us have a problem that we already know is hard. We'll call it $$ H $$. Suppose, we found a way to "reduce" $$ H $$ to $$ C $$ and the reduction takes polynomial time.

Then, if $$ C $$ is simple, $$ H $$ can be solved by first transforming it into $$ C $$ and then solving $$ C $$. The first step takes polynomial time (because the transformation is polynomial time) and the second step takes polynomial time (by definition of a simple problem), thus the entire solution of $$ H $$ takes polynomial time. But this contradicts the fact that $$ H $$ is hard! It follows that $$ C $$ is *not* in fact simple.

So, to reduce $$ x $$ to $$ y $$ means "to solve the problem $$ x $$ through the problem $$ y $$". It's absurdly easy to confuse which way the reductions work and to try to reduce $$ y $$ to $$ x $$ when you need to reduce $$ x $$ to $$ y $$. This happens because the terminology is dumb as shit. In everyday life we reduce something big to something small; *here, it's the opposite*. The way to intuitively remember it is to keep in mind that a simple problem can be solved through a hard problem--doing it would simply be inefficient. But a hard problem cannot be solved through an easy problem--because this would imply that that problem is not hard after all. Thus, we always reduce a simpler problem to a more difficult one.

Let us return to $$ C $$ now. Again, the problem statement is:

>Does there exist a clique (a set of vertices in a graph that are all connected between each other) of size $$ n $$ in a given graph?

And we suspect that this is indeed a hard problem. In this case, we have to find some problem that we know for sure is hard, and then reduce it to $$ C $$. A hard problem we will use here is [3-SAT problem](https://en.m.wikipedia.org/wiki/Boolean_satisfiability_problem#3-satisfiability), the formulation of which is the following:

>Given a boolean expression that
>
>(1) consists of clauses joined by ANDs
>
>(2) each clause consists of exactly 3 variables (or their negations), joined by ORs
>
>(for example: $$ (x_1 \vee x_2 \vee x_3) \wedge (x_2 \vee \not x_3 \vee \not x_4) $$)
>
>are there such values $$ x_1...x_n $$ that the expression is TRUE?

To prove that $$ C $$ is hard we need to reduce 3-SAT to $$ C $$. The reduction is elegant but it's not super straightforward. Moreover it's explained clearly and beautifully [over here](http://www.ida.liu.se/opendsa/OpenDSA/Books/Everything/html/threeSAT_to_clique.html), so I invite to check it out and will omit the reduction in this post.

Now, there's several things to clear up here.

First, I lied when I wrote that we know that 3-SAT is hard. 3-SAT belongs to a large class of problems all of which can be polynomially reduced to one another. This class is called **NP**-complete (**NPC**). **NPC** consists of the hardest problems that can be verified in polynomial time. However, we don't know whether there exists an algorithm that solves **NPC** problems in polynomial time. In fact, if we call simple problems **P**, then finding out whether **NPC** $$ \in $$ **P** would solve the question whether [**P**=**NP**](https://en.m.wikipedia.org/wiki/P_versus_NP_problem).

So, for example, while we can reduce the problem of ordering numbers to e.g. clique problem, we don't know if a reduction from clique to ordering exists. Finding such a reduction or proving that it doesn't exist would actually constitute the solution of **P** versus **NP**.

Ok, one last time: **if we suspect that $$ y $$ is at least as hard as $$ x $$, then we reduce $$ x $$ to $$ y $$ to prove it.**

## A bit more about P, NP, etc.

I find most of the descriptions of the terms **P**, **NP**, **NPC**, and **NP**-hard to be far from clear. Even the best [stackoverflow](https://stackoverflow.com/a/1857342) answer is not as clear as it could possibly be. The way I understand it is that there's a very natural hierarchy:

1. **P** – the problems that can be solved in polynomial time.
2. **NP** – the problems answer to which is "yes" or "no", and if we are presented with a solution that answers "yes", this solution can be verified in polynomial time (for example, if we're given a solution for $$ C $$ that claims to find a clique of size $$ n $$, we will need to verify that each vertex is connected to $$ n-1$$ other vertices in the clique, for a total of $$ n + (n-1) + (n-2) + ... + 1=\frac{n(n-1)}{2} $$ steps.
3. **NPC** – the hardest problems in **NP**. Alternatively, the problems to which we can reduce all problems in **NP**.
4. **NP**-hard – the problems that are at least as hard as **NPC**.

So, if **P**$$=$$**NP**, then **P**=**NP**=**NPC**. If **P**$$ \neq $$ **NP**, then **P**$$ \neq $$ **NP** and **NP** $$ \neq $$ **NPC**.

## Further reading

*[OpenDSA, Limits to Computing](http://www.ida.liu.se/opendsa/OpenDSA/Books/Everything/html/index.html#limits-to-computing)*. A more in-depth look a the topic with several reductions presented (the same site I linked to for 3-SAT reduction).

*[Introduction to the Theory of Computation](https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X)* by Michael Sipser. My fav computation theory textbook.

---

Thanks to [Sergei Obiedkov](https://www.hse.ru/en/staff/obiedkov) for reading early drafts of this post and helping me to wrap my head around all of this stuff.