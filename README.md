# embed-code

Embed code from a URL within your webpage. No fuss.

## Example

Embed the source code of this readme in your website.

```HTML
<script
    src="https://cdn.rawgit.com/Gertt/embed-code/1.0.0/index.js"
    data-type="gertt/embed-code"
    data-url="https://cdn.rawgit.com/Gertt/embed-code/1.0.0/README.md"
    data-language="markdown">
</script>
```

## Properties

- data-type: must always be `"gertt/embed-code"` to make the script work
- data-url: the url from which you want to embed the source from
- data-language: the language your content is in

## Supported languages

See [http://prismjs.com](http://prismjs.com/#languages-list)
