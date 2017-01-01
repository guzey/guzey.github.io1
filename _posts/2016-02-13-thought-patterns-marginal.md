---
layout: post
title: Thought Patterns&#58; Marginal
---

**Problem:** you have a certain action you want to be doing but when the moment comes you forget about it or the trigger just never fully comes to your attention.

**Example:** Instead of postponing small tasks (e.g. taking out the trash) I want to do them immediately, but when they actually come, I forget about this intention and continue with whatever I was doing before i.e. telling myself I'll do them later.

**How to solve?** Make these if-else action plans to always be somewhere at the back of the mind, preferably not far from the working memory, always on the edge of awareness.

**Solution:** Anki deck with the maximum card interval of 1 day and long initial learning curve.

(Assumption I have to make here is that you use Anki at least somewhat daily (I do it while commuting))

<!--excerpt-->

## Motivation

Why is this post called "marginal" and why should this work at all? Because the problem with the type of actions I described here is not that they're intrinsically hard, but the inertia. Frequent reminders of them by Anki should make it go away and substitute the old thought pattern with the new one without significant exertion of will.

Why use Anki instead of just daily reminders or something? Because there's a qualitative difference between recognition and recall. Seeing a reminder that tells you to do something brings it to your awareness for a moment and that's it. Seeing a "less than 3 minutes" card in Anki, makes you recall what you actually want to do and explicitly form the thought "If a task should take less than 3 minutes to complete, I will just do it instead of postponing it", which lasts much longer and, hopefully, causes some cognitive dissonance.

## Dec 2016 update: Wait, but does it *actually* work?

It totally does:

* Every time I see a full trash can, a thought "I'm not postponing stuff like this" almost compulsively pops up in my mind and I obediently take out the trash.
* Just now I needed to send an ughy email and instead of thinking "uh, will write it later", the thought process was, "ok, but is my mental state gonna be any different in the future? No. Then don't postpone it." And I sat down and sent it immediately.
* When I get a compulsion to check social media "for the last time" the following thought appears "no, the last time was the last time. Otherwise the commitment is not credible." This works like 70% of time.

## Implementation

To try this strategy, you need to create a new deck in Anki, and create a note, which has e.g. "less than 3 minutes" on Front card and "If a task should take less than 3 minutes to complete, I will just do it instead of postponing it" on Back card. I have a "thought_pattern" tag associated with these notes.

Then go to deck options and create a new Options group. Key settings are:

1. Steps (in minutes) -- I set to 1 5 10 40 120 360 1440, but you can experiment with this
2. Graduating interval -- 1 day
3. Easy interval -- 1 day
4. Interval modifier -- anything less than 100% (otherwise 1 day limit would be ignored)
5. Maximum interval -- 1 day

## Further Reading

[Trigger Action Planning](http://lesswrong.com/r/discussion/lw/o7c/making_intentions_concrete_triggeraction_planning/).

A similar idea was proposed on LessWrong back in [2011](http://lesswrong.com/lw/5v1/selfprogramming_through_spaced_repetition/).