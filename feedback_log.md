feedback_log.md
Macolin Moeung, Group 1
Groupmate (initials)	Their live address	Link to my comment	Posted on	Findings
[ROHITH KANNA RAJESH KANNA]	https://busnow-sg-rohithkanna.vercel.app/	[https://disqus.com/by/macolinmoeung/?]	[27/09/2026, 11:00am]	3
[TUSTI TANAYA SAHARIA]	https://mgmt6110.vercel.app/	[https://disqus.com/by/macolinmoeung/?]	[27/09/2026 4:00pm]	3
[ANG WEE KEE]	https://catchmybusnew.vercel.app/	[https://disqus.com/by/macolinmoeung/?]	[27/09/2026, 11:00am]	3
[AYUMI LIOW]	https://sgbusnow.vercel.app/	[https://disqus.com/by/macolinmoeung/?]	[27/09/2026, 9:00pm]	3


The evaluation dates below are test times, not confirmed comment posting times. Replace the comment-link placeholders with links to the individual Disqus comments. Confirm that the BUSSG observations in the first and fourth entries belong to their respective apps before submission.

BUSSG — busnow-sg-rohithkanna.vercel.app
Heuristic evaluation by Macolin Moeung, Group 1
Tested on laptop, 27/09/2026 at 11:00 am

Finding 1
Where: https://busnow-sg-rohithkanna.vercel.app/ — live bus-arrival screen after selecting a campus stop
What I did, what I saw: I selected a campus stop and looked for a particular bus service. The list was long, so I had to scroll through many services to find it.
Which heuristic: #7 — Flexibility and Efficiency of Use
Screen or system: Screen. The arrival list needs a faster way to locate a service.
Severity, and why: 2 — Minor. I could still find the bus, but the scrolling slowed me down.
The repair: Let users search or filter by bus number, or save favourite services at the top of the list.

Finding 2
Where: https://busnow-sg-rohithkanna.vercel.app/ — campus bus-stop selection screen
What I did, what I saw: I reviewed the campus stops before choosing one. The list showed the stops, but not their approximate walking distance from SMU buildings.
Which heuristic: #6 — Recognition Rather than Recall
Screen or system: System. The app needs walking-distance information for each stop, which the selection screen can display.
Severity, and why: 2 — Minor. I could choose a stop, but deciding which was most convenient took extra effort.
The repair: Show an approximate walking distance or time from a selected SMU building beside each stop.

Finding 3
Where: https://busnow-sg-rohithkanna.vercel.app/ — live bus-arrival screen after selecting a campus stop
What I did, what I saw: I checked the bus numbers and arrival times. I could see when each bus was coming, but not its destination or direction.
Which heuristic: #6 — Recognition Rather than Recall
Screen or system: System. Each arrival needs route-direction information that the screen can display.
Severity, and why: 3 — Major. Someone unfamiliar with the route could board a bus going the wrong way.
The repair: Show the destination or direction beside each bus number.
What works, and should stay as it is: Campus stop selection is simple, arrival times are visually separated, and the green “Arriving” status makes nearby buses easy to notice.

App Snuffers — mgmt6110.vercel.app
Heuristic evaluation by Macolin Moeung, Group 1
Tested on laptop, 27/09/2026 at 4:00 pm

Finding 1
Where: https://mgmt6110.vercel.app/ — header → live weather badge → weather details popover
What I did, what I saw: I opened the weather badge before choosing an outfit for my dog. The popover said “LIVE 2-HOUR WEATHER” and “Updates ~30m,” but did not show when the displayed condition was last updated.
Which heuristic: #1 — Visibility of System Status
Screen or system: System. The weather data needs a last-updated timestamp that the screen can display.
Severity, and why: 2 — Minor. I could use the forecast, but could not judge how current it was.
The repair: Show an “Updated at [time]” label beside the weather condition.

Finding 2
Where: https://mgmt6110.vercel.app/ — Curated Silhouette Gallery → Wild Salmon & Cranberry Crunch → product details
What I did, what I saw: I opened the treat details to decide whether it suited my dog. I found a description and some ingredients, but no full ingredient list or feeding guidance.
Which heuristic: #6 — Recognition Rather than Recall
Screen or system: Screen. The product page should put the information needed for this decision in one place.
Severity, and why: 3 — Major. The missing details could prevent a confident purchase decision.
The repair: Display the complete ingredient list and clear feeding guidance on the product page.

Finding 3
Where: https://mgmt6110.vercel.app/ — header → Shopping Bag, with 0 items
What I did, what I saw: I opened the empty bag and saw “Free Islandwide Singapore Delivery Unlocked Over S$50.” “Unlocked” made it unclear whether free delivery already applied.
Which heuristic: #4 — Consistency and Standards
Screen or system: Screen. The delivery message should match the current bag status.
Severity, and why: 2 — Minor. It could mislead customers about eligibility.
The repair: Say “Add S$50 to qualify for free delivery” when the bag is empty, update the remaining amount as items are added, and say “Free delivery unlocked” only when the threshold is met.
What works, and should stay as it is: The header weather badge makes the forecast easy to find.

Catch My Bus! — catchmybusnew.vercel.app
Heuristic evaluation by Macolin Moeung, Group 1
Tested on laptop, 27/09/2026 at 11:00 am

Finding 1
Where: https://catchmybusnew.vercel.app/ — weather section and Disqus comments below it
What I did, what I saw: I scrolled from the weather content to the comments and was briefly unsure whether the comments were part of the weather feature.
Which heuristic: #4 — Consistency and Standards
Screen or system: Screen. The layout should distinguish feature content from comments.
Severity, and why: 1 — Cosmetic. The boundary caused brief confusion but did not block use.
The repair: Add a “Comments” heading, divider, or more spacing before Disqus.

Finding 2
Where: https://catchmybusnew.vercel.app/ — bus-stop search in Live Arrivals
What I did, what I saw: I used the search to find a stop. If a query returned no match, the flow did not make the next action clear.
Which heuristic: #9 — Help Users Recognize, Diagnose, and Recover from Errors
Screen or system: Screen. The empty-results state should explain what happened and how to continue.
Severity, and why: 2 — Minor. A user could retry, but may not know how to improve the query.
The repair: Show “No stops found” and suggest checking the spelling, using a stop code, or viewing nearby stops.

Finding 3
Where: https://catchmybusnew.vercel.app/ — arrival times in Live Arrivals
What I did, what I saw: I saw “2 min, 40 min” and assumed these were the next and following buses, but the display did not explain which was which.
Which heuristic: #2 — Match Between System and the Real World
Screen or system: Screen. The times need labels familiar to passengers.
Severity, and why: 2 — Minor. The ambiguity could affect when I leave for the stop.
The repair: Label the times “Next: 2 min” and “Following: 40 min,” or separate them with clear headings.
What works, and should stay as it is: The app's purpose is easy to understand, and its main arrival information is presented simply.

SG Bus Now — sgbusnow.vercel.app
Heuristic evaluation by Macolin Moeung, Group 1
Tested on laptop, 27/09/2026 at 9:00 pm

Finding 1
Where: https://sgbusnow.vercel.app/ — live bus-arrival list after selecting a campus stop
What I did, what I saw: I selected a campus stop and looked for a particular service. The list was long, so I had to scroll through many buses.
Which heuristic: #7 — Flexibility and Efficiency of Use
Screen or system: Screen. The list needs a quicker way to find a service.
Severity, and why: 2 — Minor. The bus was findable, but scrolling took extra time.
The repair: Add a bus-number search or filter, or let users pin favourite services.

Finding 2
Where: https://sgbusnow.vercel.app/ — campus bus-stop selection screen
What I did, what I saw: I reviewed the campus stops, but the list did not show approximate walking distances from SMU buildings.
Which heuristic: #6 — Recognition Rather than Recall
Screen or system: System. Walking-distance estimates are needed for the screen to show them.
Severity, and why: 2 — Minor. I could choose a stop, but judging which was closest took extra effort.
The repair: Show an approximate walking distance or time from a selected SMU building beside each stop.

Finding 3
Where: https://sgbusnow.vercel.app/ — live bus-arrival list
What I did, what I saw: I checked a bus number and arrival time, but saw no destination or direction, leaving me unsure where it was going.
Which heuristic: #6 — Recognition Rather than Recall
Screen or system: System. The app needs route-direction data to show in the list.
Severity, and why: 3 — Major. A user unfamiliar with the route could board in the wrong direction.
The repair: Display the destination or direction beside each bus number.
What works, and should stay as it is: Stop selection is simple, arrival times are visually separated, and the green “Arriving” status is easy to notice.
