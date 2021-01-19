# Example usage

```
<div id="emails-input"></div>
<link href="emails-input.css" rel="stylesheet" />
<script src="emails-input.js"></script>
<script>
  var inputContainerNode = document.querySelector('#emails-input');
  var emailsInput = EmailsInput(inputContainerNode, {
    emails: [
      'john@miro.com',
      'invalid.email',
      'mike@miro.com',
      'alexander@miro.com',
    ],
  });
</script>
```

See also: [https://smvv.github.io/emails-input/](Demo page)

# Development

## Install dependencies

```
yarn
```

## Serve

```
yarn run serve
```

## Deploy to github pages

```
yarn run build && yarn run deploy
```
