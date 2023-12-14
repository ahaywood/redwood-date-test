# Redwood Date Test

This project isn't fancy, but it does a good job of stripping away all the noise and showing you how to use the `Date` and `DateField` components.

![](/images/event-page-screenshot.png)

## Quick Start / Setup

This is a [RedwoodJS](https://redwoodjs.com) `Date` and `DateField` demo project, used to demonstrate how the `Date` and `DateField` components work.

> **Prerequisites**
>
> - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
> - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Welcome Page, which links out to many great resources.

## Summary

This project only has one page: `web/src/pages/EventPage/EventPage.tsx`.

Here, you'll find a form at the top, that takes a `name`, `dateTime`, and a `date`.

When you submit the form, the information is immediately displayed below the form. The `web/src/components/EventListCell/EventListCell.tsx` component is responsible for querying the database and displaying this information.

When you submit a date or a dateTime, the value can be handed off to the database, without any additional work.

However, when you get the date from the database, you can't simply feed it back into the `date` input. That's because the browser is returning a date object and the HTML form input needs a date formatted as a string: `YYYY-MM-DD`.

You can reformat it with a function like this:
```
const formatDateForInput = (date) => {
  const displayDate = new Date(date)
  console.log(displayDate.toISOString().split('T')[0])
  return displayDate.toISOString().split('T')[0]
}
```

Same with the `datetime-local` input. The HTML datetime-local input expects the date and time to be in the format YYYY-MM-DDTHH:MM, where YYYY is the four-digit year, MM is the two-digit month, DD is the two-digit day, T is a separator, HH is the two-digit hour (24-hour format), and MM is the two-digit minute.

You can reformat it with a function like this:

```
const formatDateTimeForInput = (date: string) => {
  const displayDate = new Date(date)
  const year = displayDate.getFullYear()
  const month = String(displayDate.getMonth() + 1).padStart(2, '0') // Months are 0-indexed in JavaScript
  const day = String(displayDate.getDate()).padStart(2, '0')
  const hours = String(displayDate.getHours()).padStart(2, '0')
  const minutes = String(displayDate.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}`
}
```

Here's a screenshot of what the data looks like within the database:

![](/images/event-db.png)

and how that information gets displayed to the frontend and passed on to the respective forms:

![](/images/event-page-screenshot.png)
