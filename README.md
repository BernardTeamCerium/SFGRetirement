# Sibley Financial Group: Troy Sibley video landing page

Static marketing landing page for Troy Sibley, styled to match sibleyfinancialgroup.com.

- `index.html`: hero video, lifetime-income copy, meeting overview, advisor bio, and calls to action
- `book.html`: appointment request form (Netlify Forms, form name `book-troy`)
- `thank-you.html`: confirmation page shown after the form is submitted

## Video
The player tries `assets/video/troy-sibley-promo.mp4` first, then streams the original
`.mov` from Dropbox. For the best playback on every browser, export the clip as H.264 MP4
and save it at `assets/video/troy-sibley-promo.mp4`.

## Form submissions
Deploy on Netlify and the form is detected automatically. Add a notification email under
Site → Forms → `book-troy` so new booking requests reach the office.
