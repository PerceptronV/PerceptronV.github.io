---
layout: post
title:  "Flight Speed Estimate for Long-Haul Flights (using nothing more than a boarding pass)"
date:   2021-04-10 15:15:00 +0000
categories: lifehacks physics math
excerpt: What I did to kill time on my 12-hr flight from HK to London - calculating average flight speed with only flight duration, timezones, and some general knowledge.
---

<img src="{{ site.baseurl }}/assets/images/airplane-snowy-planes.jpg" style="width: 100%; display: block; margin: auto;">

<div style="text-align: center; font-style: italic;">
Photo taken on my flight. <br/>
Somewhere pretty I suspected to be the wilderness of Siberia, but turned out to be near Chanovskiy Rayon. 
</div> <br/>

## Motivation

The sheer boredom of a 12-hour fligh drove me to do something more productive. Armed with no Internet and only my boarding pass, I decided to take a logical estimate on the flight speed of my jet.

I know. A very common idea of fun. I mean - why watch Netflix when you can do some math?

## Flight Details

```yaml
Departure: HKG at 1530 HKT (GMT +8)
Flight duration: 12 hours
Arrival: LHR at 1930 GMT
```

*Note that arrival time has been converted from DST to normal time, in order to preserve direct proportion between timezones and travel distance*

## Working out the flight speed 

First, I noted that my plane is travelling west. Since the direction of the Earth’s spin is towards the east (as is evident by the direction of sunrise), the plane is therefore flying 'against the spin'.

This means the following:

1) Suppose my plane travels as fast as the Earth spins. Then its local time will always be constant.

2) If it travels quicker than the Earth’s spin, then its local time will gradually decrease.

3) If it travels slower than the Earth’s spin, then its local time will gradually increase.

My flight belongs to case 3, as the local time of my arrival is later than the local time of my departure.

Since the local times between my departure and arrival differ by 4 hours, and the flight itself is 12 hours, the plane 'loses' \\(\frac{1}{3}\\) hour of local time per flight hour. AKA, for every 1 hour that elapses due to the Earth’s spin (on a stationary point), the plane is able to counter \\(\frac{2}{3}\\) of that, by 'flying westwards against the spin'. Hence, the plane travels at \\(\frac{2}{3}\\) the speed of the Earth’s rotation.

Assuming the plane is near the equator, the speed of Earth’s rotation can be estimated via its radius, which is (according to my memory) 6371 km. Yep - I know this breaks the promise of the title. But it's something you *just should know*, right? It doesn't matter if it's on the boarding pass.

Anyways, speed of Earth’s spin near equator<br/><br/>
\\(= \frac{distance\;covered}{time}\\)<br/><br/>
\\(= \frac{circumference\;of\;equator}{length\;of\;a\;day}\\)<br/><br/>
\\(= \frac{2 \times 6371\;km \times \pi}{24\;hr}\\)<br/><br/>
\\(= 1667.923899668381\;km/hr\\)<br/><br/>
\\(= 1700\;km/hr\;(2\;s.f.)\\)<br/><br/>

Therefore, estimated flight speed for my jet<br/><br/>
\\(= 1667.923899668381\;km/hr \times \frac{2}{3}\\)<br/><br/>
\\(= 1111.949266445587\;km/hr\\)<br/><br/>
\\(= 1100\;km/hr\;(2\;s.f.)\\)<br/><br/>

## General formula

Note that this is assuming the plane is travelling west. All units of distance are in km, while all units of time are in hr, as is customary in aviation.

Flight speed estimate = \\(\frac{2 \times 6371\;km \times \pi}{24\;hr} \times \left(1 - \frac{Arrival\;local\;time - Departure\;local\;time}{Flight\;duration}\right)\\). 

## Reflections

I know that on average, a plane takes off when it reaches about 300 m/s. It’s actual flight speed is probably quite a bit higher.

Converting my flight speed estimate from km/hr to m/s, I get 310 m/s (2 s.f.), which fits quite nicely with the takeoff speed above. 

Looking up the average flight speed, here's what I got from Wikipedia.

> The typical cruising airspeed for a long-distance commercial passenger aircraft is approximately 880–926 km/h

OK. So % deviation is ~20%. 🥵 Hopefully not too bad, though?!

## Assumptions made / sources of error

1. Plane travels in straight line parallel to the equator
    * If plane doesn't, estimation is less than actual value (only the average horizontal component)
2. Plane flies near the equator
    * If plane doesn't, estimation is greater than actual value 
3. Timezones are continuous and directly proportional to distance travelled
    * If they are not, it could either make the estimation greater or lesser than actual value 

I originally thought that assumption 1 is the main sources of error, because as a matter of fact, I know my jet flies northwards for quite a few hours before turning west. But since my estimation is higher than the actual value, then assumption 2 probably takes over. 

Alright. Fun time's over. See ya next time, when I may bring news of the new `yucatan` pattern engine I'm working on in Python, or talk a bit about Nextjs.
