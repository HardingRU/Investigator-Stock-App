# Hosted app

You can find the hosted app here:
https://secret-badlands-93489.herokuapp.com/




# Proposal

My proposal is for a stock market portfolio app, which allows users to manage and track their stock investments.  The app name will be Investigator (and have an alligator logo!).

## Wireframes
https://invis.io/E6GR6UFXFSM

## User Stories (MVP)
- Users can view a dashboard of their portfolio to see a summary of their holdings
- User can search for stocks by ticker
- User can click on stock from search to view stock page
- Stock page will have a d3 graph that users can manipulate over certain time horizons
- User can add a stock to their portfolio, which will include the number of shares they own and the price they bought the shares at
- Users can remove a stock from their portfolio

## Reach Goals
- Adding of a Portfolio Metric page that allows users to see their holdings breakdown by stock, by sector, etc etc.
- Allow users to have multiple distinct portfolios
- Add in other data in addition to just stock prices (fundamentals, etc)
- Allow graphical comparison of stocks (i.e. have more than one stock on graph at a time)

## Technologies Used
- Ruby on Rails
- React
- D3
- Devise for Auth

## Timeline
Monday: Proposal and D3 learning
Tuesday: D3 learning and basic scaffolding
Wednesday: API integration to pull data
Thursday: D3 graphing of API data
Friday: Build out functionality for auth as well as for users managing the portfolios (add stock, remove, etc)
Saturday: Styling
Sunday: Deployment and reach goals
Monday: Presentation

## Challenges
There are two main challenges that I anticipate:
1) Learning and getting D3 up and running, and then making it work with data that isn't guaranteed to be consistent (missing days, etc).  It could be challenging to have different time horizons work on the chart (1 Week, 1 Month, etc), as you have to figure out what the right dates are to display on the chart based on this selection.
2) Dealing with the intricacies of stock market data (missing data, adjusted data for splits, dividends, etc)

## Repo Link
https://github.com/HardingRU/Investigator-Stock-App
