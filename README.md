# Table.js

### Inspiration
The main inspiration behind creating ***Table.js*** was a recent Salesforce project that we did at [Dazeworks](http://dazeworks.com/) where there was a need to display a Table or better said a "matrix" report kind of a table grouped along both the Rows and Columns similar to how it might look in a Spreadsheet Application. One of the libraries that we started with was the magnificient [**handsontable**](http://handsontable.com/). 

But since we had quite a good number of matrices that we had to display on the same page, handsontable became resource intensive. Moreover we never made use of any goodness that handsontable offered. The sole aim was to produce a "*static*" table that looked similar to the one shown below with support for *custom cell formatting*.

![screenshot_1](https://cloud.githubusercontent.com/assets/3683725/12074161/f322e6aa-b16a-11e5-8ae8-1fe95f3d4805.png)

And thus went ahead to write a small JS library that would offer this!

### Usage

##### Setting up the DOM
In order to use Table.js, include the [Table.js](https://github.com/Deepak-K-Anand/Table.js/blob/master/src/Table.js) file in your HTML Document.

```html
<script type="text/javascript" src="js/Table.js"></script>
```

Then add a **DIV** element like as shown below - 
```html
<div id="container"></div>
```
that would wrap the HTML Table. The Table will be added to this DIV element as it's child. One can also apply **Twitter Bootstrap** on the wrapper DIV to make the contained HTML Tables to be [responsive](http://getbootstrap.com/css/#tables-responsive) too.
```html
<div id="container" class="table-responsive"></div>
```
##### Writing the JavaScript
Now for the JavaScript, it should be as simple as this - 
```javascript
new Table(
    /*Container DIV*/
    document.getElementById( "container" ),
    {
        /*2-D Array with the Rows aka the Data*/
        rows         :  [
                            [4,  8,  9,  7,  9  ],
                            [25, 25, 22, 28, 22 ],
                            [0,  0,  0,  0,  0  ],
                            [75, 37, 0,  28, 33 ],
                            [57, 0,  73, 82, 0  ],
                            [52, 52, 0,  70, 90 ]
                        ],
        /*Column Headers*/
        colHeaders   :  [36, 37, 38, 39, 40],
        /*Row Headers*/
        rowHeaders   :  ["Leads", "Contacts", "1 on 1", "Commitment", "Launch", "Handoff"]
    },
    {
        /*A Caption for the Table. This can be set to NULL if not needed.*/
        caption      :  "Leads Grouped By Week and Funnel",
        /**
         * Whether to append the Table to any existing Tables within the Container. 
         * When set to TRUE the destroy() function will not be invoked on the
         * Container.
         */
        appendTable  :  false,
        /**
         * A Cell Renderer Function that highlights the Cells based on it's content. 
         * This can be set to NULL if not needed.
         */
        cellRenderer :  function( td, isDataCell, isFirstRow, isColHeader, isRowHeader ) {
            if( isFirstRow ) {
                td.style.backgroundColor = "#AEA79F";
            }
            else if( isDataCell ) {
                var value = parseInt( td.innerHTML );
    
                if( value >= 25 && value <= 50 ) {
                    td.style.backgroundColor = "#F0FFF0";
                }
                else if( value > 50 && value <= 75 ) {
                    td.style.backgroundColor = "#93C572";
                }
                else if( value > 75 && value <= 100 ) {
                    td.style.fontWeight      = "bold";
                    td.style.backgroundColor = "#138808";
                }
            }
    
            /*Don't forget to sent the modified Cell back!*/
            return td;
        },
        callback     :  function() {
            /**
             * The Callback function to plot Sparkline Charts.
             */
            jQuery("span.line").peity("line");
        }
    }
).generate();
```

You can remove a Table from the Container by invoking the `destroy()` function like as shown below - 
```javascript
new Table( document.getElementById( "container" ) ).destroy();
```

### Demo
A working example on JS Fiddle: [http://jsfiddle.net/6ptgb5hn](http://jsfiddle.net/6ptgb5hn/3/embedded/). The line charts have been implemented using [Peity.js](http://benpickles.github.io/peity/).

> Note: The Table.js and Peity.js have been served via my personal Firebase App and this is not a <strike>CDN</strike>! So please use it by downloading the same and refer it as a local resource.

### Styling
The Table.js also applies a set of CSS classes to the Table and the Cells. They are enumerated as below - 

1. Row Headers
 * *CSS Class*: **row-header**
 * *Description*: This CSS class is applied to the Row Headers.
2. Column Headers
 * *CSS Class*: **col-header**
 * *Description*: This CSS class is applied to the Column Headers.
3. Data Cells
 * *CSS Class*: **data-cell**
 * *Description*: This CSS class is applied to all the other Cells.
4. Table
 * *CSS Class*: **table table-bordered table-hover**
 * *Description*: This CSS class is applied to the Table. This is a set [Bootstrap](http://getbootstrap.com/css/#tables-bordered) classes.

This gives more flexibility to the developers thus allowing them to control the look and feel of the headers and individual data cells via CSS.

##### Applying CSS
Here is a set of sample CSS rules that were applied to get a similar look and feel as the Table shown in the screenshot above - 
```css
th,
.row-header {
    color            : white;
    font-weight      : bold;
    background-color : #288FFE;
}

.row-header {
    width: 15%;
}

.col-header {
    text-align: center;
}

.data-cell {
    text-align: center;
}
```
> Since the HTML Table is generated in compliance with the [W3C Specifications](http://www.w3.org/TR/html401/struct/tables.html), one will have to access the Column Header Cells using the Tag Selector - `th { }` and not ~~`td {}`~~.

> Table.js also applies the Twitter Bootstrap classes to the containing Table.

### Licensing
Completely free! Use it at your own will.

### Credits
Deepak @ [**Dazeworks Technologies Pvt Ltd**](http://dazeworks.com/)
