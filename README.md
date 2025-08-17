# Countdown Timer Website

A beautiful, interactive countdown timer website built with HTML, CSS, vanilla JavaScript, and a bit of AI 🪄.

## Usage

### Basic Usage

Open the website with an `endDate` query parameter:

```
?endDate=2025-12-31T23:59:59
```

### With Custom Motivational Quotes

You can provide custom motivational quotes using the `motivation` parameter. The quotes should be:
1. Comma-separated
2. Base64 encoded

```
?endDate=2025-12-31T23:59:59&motivation=WW91IGdvdCB0aGlzISxLZWVwIHB1c2hpbmchLEFsbW9zdCB0aGVyZSE=
```

### Creating Base64 Encoded Quotes

To create your own motivational quotes:

1. Create a comma-separated list: `"You got this!,Keep pushing!,Almost there!"`
2. Encode it to Base64 (you can use online tools or browser console):
   ```javascript
   btoa("You got this!,Keep pushing!,Almost there!")
   ```
3. Use the result in the `motivation` parameter
