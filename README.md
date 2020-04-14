# CSV Items Event View
_View a set of chronological events from a CSV file, in a nicer way._

I created this thing because I needed a better visualization of some CSV files that I usually work on, that are used to store chronological events on a set of items.

## CSV structure
The format of these CSV files looks like this:

```
Item_1,gg/mm/aa|event_type,...,gg/mm/aa|event_type
...
Item_n,gg/mm/aa|event_type,...,gg/mm/aa|event_type
```

![Example](https://user-images.githubusercontent.com/30431538/79247760-372d1500-7e7b-11ea-81dc-c258136645e8.png)

## Usage
Just start a webserver in the directory where you cloned this repo, and go there with a browser.

### Configuration
The script looks for a `config.json` file, that contains info such as the CSV input file, the separator, etc; for example:

```json
{
  "projectName": "Sample tracking",
  "inputFile": "examples/sample.csv",
  "separator": ",",
  "skipEmptyRows": true,
  "customCSS": "examples/sample.css",

  "eventTypeMapping": { 
      "a": "Type A",
      "b": "Type B"
  }
}
```

#### eventTypeMapping
With it you can map the alias (`event_type`) in the CSV to a human-comprehensible event name that you decide.

#### skipEmptyRows
If you have rows with no events, with this flag you can skip them.

#### customCSS
You can point to a CSS file in wich you can give some eye-candy to your output.
For example, since each cell has a CSS class `type-<event_type>` you can define rules for specific event types:

```css
.type-a {
    background: rgba(197, 237, 52, .5);
}
```

### Multiple configuration
What happens if - let's say - you want to use this thing with 3 CSV files?
- Just make 3 copies of `index.html`, and create 3 JSON configurations.
- Configure the JSON files as you need;
- Point to the correct JSON configuration in the HTML files, by adding this line just before `<script src='main.js'></script>`:
```html
<script>configFile = 'correct-config-file.json'</script>
```

By doing this, you now have a page for each configuration/CSV to visualize.

## Example

```csv
Atalanta,02/02/20|d,08/02/20|w,15/02/20|w,01/03/20|w
Roma,07/02/20|l,15/02/20|l,23/02/20|w,01/03/20|w
Lazio,09/02/20|w,16/02/20|w,23/02/20|w,29/02/20|w
Inter,02/02/20|w,09/02/20|w,16/02/20|l,08/03/20|l
```

![Example 2](https://user-images.githubusercontent.com/30431538/79250649-457d3000-7e7f-11ea-851f-cb44b817eb91.png)
