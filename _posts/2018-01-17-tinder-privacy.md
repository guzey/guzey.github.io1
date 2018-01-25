---
layout: post
title: Tinder Is Effectively Deanonymized in Russia
---

Abstract: About 2/3s of tinder accounts in Moscow, Russia can be directly linked to a VK account with very little effort, and based on tinder pictures alone.

---

## Introduction

Is tinder anonymous? It might be in the United States. It's definitely not in Russia.

[FindFace.ru](https://findface.ru/) is a site that claims to be able to "find anybody in VK.com" (VK being the Russian facebook), and it has been shown to work extremely well in a wide variety of cases [[1](https://www.washingtonpost.com/world/europe/as-moscow-goes-high-tech-so-does-its-surveillance-system/2017/12/17/3b3ef2cc-da9e-11e7-a241-0848315642d0_story.html), [2](https://themoscowtimes.com/news/protests-58350), [3](https://www.theguardian.com/world/2016/apr/14/russian-photographer-yegor-tsvetkov-identifies-strangers-facial-recognition-app)].

I decided to test it on tinder profiles to see how easy it would be to identify people the only way to contact whom should've been to be reciprocally "liked" by them.

## Methodology

1. I omitted profiles that did not contain at least one picture of a person
2. I omitted profiles that used a fake name (e.g. foxy)
3. I omitted profiles that contained fake pictures (i.e. FindFace found several VK accounts with the pictures used in the tinder profile or the profile contained pictures of different people)
4. I omitted profiles of girls under 18 years old (if it was clear from their pictures or if they stated they were under 18 in the bio)
5. I omitted profiles where a significant portion of the face was missing, hidden by the phone or by some overlay.

I included all other profiles in the statistics. For example, if a tinder profile contained only one low-quality photo but the person was intelligible, I included it.

I did not check pictures from the connected instagram and I did not use VK's search function by using the age and university info from the tinder bio.

### A sample of included profiles:

<p align="center"><img src="/files/tinder-privacy/accept-merged.jpg" width="90%"></p>

### A sample of non-included profiles:

<p align="center"><img src="/files/tinder-privacy/deny-merged.jpg" width="90%"></p>

### An example of search results for a real profile:

<p align="center"><img src="/files/tinder-privacy/real-example.jpg" width="90%"></p>

### An example of search results for a fake profile:

<p align="center"><img src="/files/tinder-privacy/fake-example.jpg" width="90%"></p>

## Experiment

I searched for 100 people from tinder on FindFace and found *63 matching VK accounts*.

Note: I saw around 120 profiles, which resulted in exactly 100 included in the analysis, and used about 160 photos in total.

## Discussion

How is this result possible? The main reason is that VK's default privacy settings are such that the vast majority of personal information and photos is accessible to anyone on the internet, including search engines. For example, my page, along with several high-quality photos of me, is [stored in google cache](https://webcache.googleusercontent.com/search?q=cache:3oK5zYeWHvoJ:https://vk.com/alexeyguzey+&cd=2&hl=en&ct=clnk&gl=ru). Or you could just [go to my page directly](https://vk.com/alexeyguzey), and, even not being logged in, see all of the photos I uploaded or was tagged on.

<p align="center"><img src="/files/tinder-privacy/vk-privacy-settings.png" width="90%" alt="VK privacy settings"></p>

So one way to index VK's users would be to simply check id1, id2, id3, id4, ..., change ip address every once in a while when VK starts blocking you, and continue on.

## Conclusion

I interpret the original number 63/100 as basically "if you have good quality pictures on tinder and your VK privacy settings are set to default ones, you will be found", from which I conclude that tinder is effectively deanonymized in Russia.