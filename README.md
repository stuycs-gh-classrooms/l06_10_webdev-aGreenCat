# Processing --> p5.js

Use this repository to publish a processing sketch to the web using p5.js. Follow the instructions below to stay on the path to success. Unlike previous work repositories, this one is _public_ and you have been given administrator access to it. This is so that the repository can be used via GitHub pages as a web host. Normal github accounts cannot use GitHub pages on private repositories, and you need administartor rights in order to enable this feature.

### Step 0: Enable Pages

[Follow these instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) to turn on the GitHub pages service. After enabling, it may take a few minutes for the page to be ready.

If you were successful, the page should look just [like this](https://stuycs-gh-classrooms.github.io/nextcs-l06-web/)

### Step 1: Know Your Files

Here are the important files:
* index.html
  * This is the html code for the website. When you point a web browser to the github pages url for your site, this file will load.
  * To do basic processing-over-the-web, you don't need to modify this file.
  * You probably will want to change the `<h1>` tag text to be a better title though.
  * If you want, you can add instructions about keyboard/mouse commands.   
* sketch.js
  * This is where your processing code will go. At the moment, it has empty `setup` and `draw` functions.
* p5.min.js  
  * This is the p5.js processing javascript library. It contains _all_ the processing commands. You should not mess with this file.


### Step 2: Get a porcessing sketch

Find a simple processing sketch you have made. To start, select a single file program (no extra classes) that doesn't use an external resource (like imaged or text files). Copy that file into this repository so you have it on hand.

### Step 3: Copy, paste & translate

Copy your processing file into _sketch.py_. You will then need to perform the java -> javascript translation. Thankfully, almost all of the processing specific commands are the same in both. The main things to change are:
* `size` which you probably call in `setup` becomes `createCanvas`
* All functions loose their return types, but you will have to include `function` before their names.
* All variables loose their types. Replace variable types with `var` (`let` is also acceptable).
  * All numbers in javascript are floating point values. If you need an integer, then make sure to use the `int` function, which works as it normally does in processing.
* Function parameters have no type at all (so function headers look like this `function foo(x, y, q)` 
* Array variables are all of the `Array` type, regardless of what they hold.
  * Example: `var arr = new Array(30)`

[Here is more information on translating from processing to p5.js](https://github.com/processing/p5.js/wiki/Processing-transition)

You can use the p5.js mode in the processing program to work on & test your code as well.

When you think you have done the translating correctly, save and commit your changes. Reload your website (you may need to wait, it's not a bad idea to put a piece of text in _index.html_ that indicates you've changed things to see if that new text loads (even just an incrimenting number is good).

### Step 4: Fix the bugs

You know there will be bugs. Open the web page in your web browser and open the developer tools, select the _console_, reload the wbe page and look to see what the error messages are.
* [here](https://balsamiq.com/support/faqs/browserconsole/) and [here](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) are good resources for accessing & using developer tools.

### Step 5: Marvel at your website.

If you got it working, try a differnt sketch! You can make a copy of _index.html_ to make new sites. If you do that:
* Name the html files something different.
* Create a new _.js_ file, don't call it _sketch.js_
* In the new html file, change `<script src="sketch.js"></script>` to the name of your new javascript file.
* You can visit the website using the main url with the new html file at the end.
  * i.e. `https://stuycs-gh-classrooms.github.io/nextcs-l06-web/funprogram.html`
