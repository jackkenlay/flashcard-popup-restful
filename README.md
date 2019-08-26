# flashcard-popups
'The Verbalist'
Popup flashcards for mac

## How to run

```node app.js```

## Libs/References
https://github.com/mikaelbr/node-notifier/blob/master/example/macInput.js
https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html (script runs but popups dont show, need to investigate with logs)

### TODO
https://en.wikipedia.org/wiki/Spaced_repetition 
https://en.wikipedia.org/wiki/Leitner_system


## Refactor
Support Multiple Decks
Don't show any cards for 1 hour.
Don't show any cards for x hours.
Refactor
Handle Exceptions better
Start on laptop/terminal start (instead of terminal start [use launchd and example plist file in directory])
Refactor
JSON Config
Documentation
give option to add 3rd tab, which is the kindle sentance with the word in the middle.
Extra spaced repitition into it's own lib, so i can use it on other projects
Move spaced repetition to restful API.
Make this able to use it.

## Other Ideas:
* Use some kind of stats for the 'space delay', ie show the card everyday (like now) until it's learnt. Then start with higher 2nd and 3rd stages. Keep track of every 2nd or 3rd stage failure and somehow plot, for different values, how common it fails depending on how large the gap is. Maybe some form of A-B test or a interval between 1-10 days and after 100 events then reassess to move the bracket up or down or shrink it. Since every one is different. Linear regression?
* Start off quickly, until the user gets so fed up they can slow it down. Aggressive and Passive mode.
* a third popup that shows stats, every 5 answered correctly.

## Front ends
* Instagram, posts to a particular hashtag your words every x minutes, front then back. If you like them, it's considered that you know it? That way we have 1 bot with 100s of followers.

* Desktop
    * Web
    * Tabs
    * Desktop background
    * Screen saver
    * bar at top of mac
    * Electron app
    * Mac lock screen -> popup.
* Mobile
    * Lock Screen
    * Phone background
    * Flashcard App
    * Notifications
* watch - swipe left or right.
* House: Kindle picture frame
* Tv - screen saver?

## FOR LEI
Open terminal: cmd + L   ->  type 'terminal' and hit enter

In terminal, type:
cd ~/flashcard-popup-restful && node app.js

Hey sexy schatzi