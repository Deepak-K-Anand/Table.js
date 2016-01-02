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
<script type="text/javascript" src="js/table.js"></script>
```

Then add a **DIV** element like as shown below - 
```html
<div id="container"></div>
```
that would wrap the HTML Table. One can also apply **Twitter Bootstrap** on the wrapper DIV to make the contained HTML Tables to be responsive too.
```html
<div id="container" class="table-responsive"></div>
```
##### Writing the JavaScript
Now for the JavaScript, it should be as simple as this - 
```javascript
new Table(
    /*Container*/
    document.getElementById( "container" ),
    
    /*Column Headers*/
    [36, 37, 38, 39, 40],
    
    /*Row Headers*/
    ["Leads", "Contacts", "1 on 1", "Commitment", "Launch", "Handoff"],
    
    /*2-D Array with the Data*/
    [
        [4,  8,  9,  7,  9  ],
        [25, 25, 22, 28, 22 ],
        [0,  0,  0,  0,  0  ],
        [75, 37, 0,  28, 33 ]
    ],
    
    /*A Cell Renderer Function*/
    function( td, isDataCell, isFirstRow ) {
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
        
        /**
         * Don't forget to sent the modified Cell back!
         */
        return td;
    },
    
    /*A Callback Function*/
    function() {
        /* A typical Callback function to plot Sparkline Charts.*/
        jQuery( "span.line" ).peity( "line" );
    }
).generate();
```

You can remove a Table from the Container by invoking the `destroy()` function like as shown below - 
```javascript
new Table( document.getElementById( "container" ) ).destroy();
```

### Bonus
The Table.js also applies a set of CSS classes to the Table and the Cells. They are enumerated as below - 

1. Row Headers
 * *CSS Class*: **row-header**
 * *Description*: This CSS class is applied to the Row Headers.
2. Column Headers
 * *CSS Class*: **col-header**
 * *Description*: This CSS class is applied to the Column Headers.
3. Data Cell
 * *CSS Class*: **data-cell**
 * *Description*: This CSS class is applied to all the other Cells.

This gives more flexibility to the developers thus allowing them to control the look and feel of the headers and individual data cells via CSS.

#####Applying CSS
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
