# adversarial_collaboration.md
Moeung Macolin, Group 1

`predictions.md` was last edited and committed on **25 September 2026 at 4:55:59 PM Singapore time**, before the groupmates’ comments shown in my screenshots. The first comment for this set appeared on my Disqus board at **[CHECK THE EXACT TIME OF THE EARLIER COMMENT FROM WK OR RK]**.

## The four-way table

### 1. Found by both

- None.

### 2. Found by them, missed by me

- The year selector offered 1950–1959 even though the indicator has no data for those years, while the introduction promised coverage from 1950 | WK F2, TTS F2, RK F3 | their severity: 2, 2, 2 | no blind arbiter.
- Country search did not recognize everyday names: “UK” returned Ukraine, while “South Korea” and “Ivory Coast” returned no match | WK F1 | severity 3 | no blind arbiter.
- A no-data result did not suggest another country or year to try | WK F3 | severity 2 | no blind arbiter.
- The “3% KH / SG 97%” bar had no explanation of what the percentages meant | TTS F1 | severity 1 | no blind arbiter.
- “Retrieved at” showed the same time after a refresh and another comparison | RK F1 | severity 2 | no blind arbiter.
- Clicking the CountryLens logo removed an open result without warning | RK F2 | severity 2 | no blind arbiter.

### 3. Found by me, not by them

- A comparison request timed out with “Provider Unreachable” when I tried 1950 and North Korea 2025 | my severity 3.
- Changing an input cleared my completed result before I ran another comparison | my severity 2.
- The source link went to a general indicator page rather than the selected countries and year, and the retrieval time had no date or time zone | my severity 2.

### 4. Found by both, rated differently

- None.

## My predictions, checked

- **Timeout, severity 3: broke.** No groupmate reported it. All three explored years in the 1950s and reported “Data not reported” instead.
- **Result clears when an input changes, severity 2: broke.** No groupmate reported that trigger. RK found a related loss of the result when clicking the logo, but that is a different action.
- **Source link and retrieval date, severity 2: broke.** No groupmate raised those details. RK found a different problem on the same line: the retrieval time stayed the same after another comparison.
- **H1 as my product’s worst heuristic: broke.** The groupmates’ findings included one under H1 and three under H5. Their highest-severity finding was WK’s country-search issue under H6.
- **Mobile clipping at severity 3 or 4: not observed.** WK tested on a 375 px Android phone, and RK also tested on a phone. Neither reported clipping.

## Q1. Where was confirmation bias in my own evaluation?

In my Finding 1, I wrote that selecting 1950 for Cambodia and Singapore produced “Provider Unreachable” and a World Bank API timeout. I treated that result as an important failure to expect. The groupmates’ comments gave me a reason to question that interpretation: WK, TTS, and RK each tried a year in the 1950s and saw “Data not reported” instead. I may have given too much weight to a timeout from my own session because I was already watching for a problem with the World Bank request. Their repeated observations pointed to a more consistent problem: the interface offered years for which the indicator had no data. I should have repeated my test before predicting that others would encounter the timeout.

## Q2. Which prediction broke, and what did it teach me?

I predicted that groupmates would notice my severity 3 timeout and that H1, Visibility of System Status, would be my product’s weakest heuristic. Neither prediction held. Three groupmates independently found the unsupported 1950s years, while WK found a severity 3 search problem I had missed. It taught me that one striking failure in my own test can draw my attention away from a simpler problem that other people encounter more consistently.

## Q3. Which groupmate finding did I nearly dismiss, and what did the evidence say?

WK’s country-search finding was the one I nearly dismissed. At first, I thought people could select a country from the list even if their preferred search term did not work. WK’s “UK” example changed how I saw the problem: Ukraine appeared as a match, so someone could select the wrong country without noticing. WK also found that “South Korea” and “Ivory Coast” returned no match. I did not use the blind arbiter because **[YOUR ACTUAL REASON]**. When I repeated WK’s searches on the reviewed version, **[WHAT YOU ACTUALLY SAW]**. I chose to repair the search by adding familiar names as aliases and putting those matches first.

## Q4. What did I revise, which heuristic does it serve, and how do I know it worked?

**Before:** [reviewed version at commit `fc54758`](https://github.com/mmacolin/MGMT6110_Problem_Set2/tree/fc54758)  
**After:** https://problemset2.vercel.app

1. **Unsupported years:** I changed the year selector and the introduction from 1950–2025 to 1960–2025. The API now rejects years before 1960 as well. This answers WK F2, TTS F2, and RK F3 and serves H5, Error Prevention. It is a screen and system change. [Commit `221b53e`](https://github.com/mmacolin/MGMT6110_Problem_Set2/commit/221b53e40e5c26a002f07fecb8a580df1c3905d0). The commit shows that the year list starts at 1960, the introduction says 1960–2025, and the API rejects earlier years. I have not yet independently checked that the deployed page displays those changes.

2. **Everyday country names:** I added search aliases including “UK,” “South Korea,” and “Ivory Coast,” and put alias matches ahead of other matches. This answers WK F1 and serves H6, Recognition Rather than Recall. It is a screen change. [Commit `39a5de3`](https://github.com/mmacolin/MGMT6110_Problem_Set2/commit/39a5de38e65b3207fec15a3bf24c4440968bdba4). The commit shows those aliases and their search order. I have not yet repeated WK’s searches on the deployed page.

3. **Retrieval label:** I changed the result so that a response whose retrieval timestamp is more than one minute old when it reaches the page is labelled “Saved copy,” with its retrieval date and time. This answers RK F1 and serves H1, Visibility of System Status. It is a screen change based on the result timestamp. [Commit `ef0f8d2`](https://github.com/mmacolin/MGMT6110_Problem_Set2/commit/ef0f8d2b1b0bd05951542004026ee2a53d44da7b). The commit shows the new label and its one-minute condition. I have not yet confirmed the label by repeating a comparison on the deployed page.

I prioritized the year problem because all three groupmates found it, the search problem because WK rated it severity 3, and the retrieval label because RK could not tell whether a result was fresh. I left the no-data guidance, unexplained percentage bar, and logo reset for a later revision. They remain useful findings, but I chose three changes that addressed repeated feedback, the highest-severity issue, and uncertainty about where a result came from.

The decisions about priorities were mine. Claude produced the code for the three repairs, which I committed on 29 September 2026. I did not ask Claude to argue against a repair, so I cannot claim that it challenged my choice. The groupmates’ comments were the evidence that changed my priorities. Over the next week, I would watch for comments saying that 1950s years are still selectable, everyday country names still fail, or the saved-copy label remains confusing. Those would tell me a repair needs more work.

## Q5. What did my users give me that I could not have found myself?

In the country picker, WK searched using “UK,” “South Korea,” and “Ivory Coast.” I had used the official country names or codes available in the list, so I had not noticed that ordinary names could fail. The “UK” search was especially useful because it returned Ukraine rather than simply showing no results. WK showed me how someone arriving with their own vocabulary would use the search box and how the result could mislead them.

## Q6. Did the AI help me confirm, or help me falsify?

The clearest challenge to my predictions came from my groupmates rather than the AI. I expected others to encounter the timeout I saw, but all three reported “Data not reported” when they selected years in the 1950s. WK also found the severity 3 country-search problem I had not predicted. Claude then produced code for the three repairs I prioritized: the year range, country-name aliases, and saved-copy label. I did not ask Claude to argue against those repairs, so I did not see it challenge my assumptions directly. Its commits show what changed in the code, but I have not independently tested all three changes on the deployed site. I therefore cannot claim yet that users see each repair working. I did not ask Claude whether the product was better now; I judged the revisions against my groupmates’ specific findings instead.
