/**
 * @author          Deepak K Anand
 * @version         1.0
 * @description     This class provides functions to generate a Spreadsheet
 *                  like static Table grouped along the Rows and Columns. It works
 *                  just like the HandsOnTable JS except that it keeps things
 *                  as simple as possible thus rendering a Plain HTML Table
 *                  on DOM. This comes in handy if you want to display a 
 *                  Matrix or Table on your Web Page and that needs to be
 *                  grouped along the Rows and Columns.
 * 
 * 
 * @param   container       A DIV Element that will hold the dynamically generated Table.
 * @param   colHeaders      A String Array containing the Column Headers.
 * @param   rowHeaders      A String Array containing the Row Headers.
 * @param   data            A 2D Array containing the data to generate the Table.
 * @param   cellRenderer    A Function that will invoked on each Cell being added to the Table.
 *                          This allows developers to write custom logic say for eg. 
 *                          "Cell Formatting" before adding the Cell to the Table. The function
 *                          will receive 3 Paramters:
 *                          
 *                          @param      td              The Current Cell in context.
 *                          @param      isDataCell      A Boolean representing if the Cell is a Data Cell or not.
 *                          @param      isFirstRow      A Boolean representing if the Cell is a part of the First Row.
 *                          
 * @param   callback        A Function that will be invoked after generating the entire Table.
 */
var Table = function( container, colHeaders, rowHeaders, data, cellRenderer, callback ) {
    this.data         = data;
    this.container    = container;
    this.colHeaders   = colHeaders;
    this.rowHeaders   = rowHeaders;
    this.callback     = callback;
    this.cellRenderer = cellRenderer;

    this.classNames = {
        classColHeader : "col-header",
        classRowHeader : "row-header",
        classDataCell  : "data-cell",
        classTable     : "table table-bordered table-hover"
    };

    this.tags = {
        table : "table",
        thead : "thead",
        tbody : "tbody",
        headC : "th",
        row   : "tr",
        cell  : "td"
    };
};

/**
 * A Member Function on the Table class that can be used to
 * remove if there is an existing Table within the Container.
 */
Table.prototype.destroy = function() {
    var existingTable = this.container.getElementsByTagName( this.tags.table );

    if( existingTable.length > 0 ) {
        for( var i = 0; i < existingTable.length; i++ ) {
            this.container.removeChild( existingTable[i] );
        }
    }
};

/**
 * A Member Function on the Table class that will 
 * generate the Table based on the Data provided.
 */
Table.prototype.generate = function() {
    var self = this;
    
    /**
     * Remove any existing tables from the
     * container.
     */
    var existingTable = self.container.getElementsByTagName( self.tags.table );

    if( existingTable.length > 0 ) {
        for( var i = 0; i < existingTable.length; i++ ) {
            self.container.removeChild( existingTable[i] );
        }
    }

    /**
     * Create the Table.
     */
    var table = document.createElement( self.tags.table );
    table.className = self.classNames.classTable;
    
    /**
     * Create the Head Tag for the Table
     * and append it to the Table.
     */
    var thead = document.createElement( self.tags.thead );
    table.appendChild( thead );
    
    /**
     * Create the Body Tag for the Table
     * and append it to the Table.
     */
    var tbody = document.createElement( self.tags.tbody );
    table.appendChild( tbody );
    
    /**
     * Create the Heading Row and append an empty
     * Cell to it. This replicates the empty
     * Cell in Spreadsheet like applications seen at the
     * top-left corner.
     */
    var headerRow = document.createElement( self.tags.row );
    headerRow.appendChild( document.createElement( self.tags.headC ) );
    
    self.colHeaders.forEach(
        function( header ) {
            /**
             * Create a Cell one by one for each of the
             * element in the colHeaders Array.
             */
            var cell = document.createElement( self.tags.headC );
            
            cell.innerHTML = header;
            
            /**
             * Add a class named "col-header" to each
             * of the Cell added to the Header Row. This 
             * gives the Developers the ability to control
             * the look and feel of the Header Row Cells in the
             * desired way via CSS.
             */
            cell.className = self.classNames.classColHeader;

            if( self.cellRenderer !== null ) {
                /**
                 * If a cellRenderer function is available then
                 * invoke the same on the newly created Cell.
                 */
                cell = self.cellRenderer( cell, false, false );
            }

            /**
             * Append the Cell to the Header Row.
             */
            headerRow.appendChild( cell );
        }
    );

    /**
     * Append the Header Row to the Head Tag
     * of the Table.
     */
    thead.appendChild( headerRow );

    /**
     * Start building the rows for the Table.
     */
    for( i = 0; i < self.data.length; i++ ) {
        /**
         * Create a Row.
         */
        var dataRow = document.createElement( self.tags.row );
        
        for( var j = 0; j < self.data[i].length; j++ ) {
            if( j === 0 ) {
                /**
                 * If it's first Cell in the row then we'll use it
                 * for the Row Header.
                 */
                var cell = document.createElement( self.tags.cell );

                cell.innerHTML = self.rowHeaders[i];
                
                /**
                 * Add a class named "row-header" to each
                 * of the Cell added to the Header Row. This 
                 * gives the Developers the ability to control
                 * the look and feel of the Header Row Cells in the
                 * desired way via CSS.
                 */
                cell.className = self.classNames.classRowHeader;
                
                /**
                 * If a cellRenderer function is available then
                 * invoke the same on the newly created Cell.
                 */
                if( self.cellRenderer !== null ) {
                    cell = self.cellRenderer( cell, false, false );
                }

                /**
                 * Append the Cell to the Row.
                 */
                dataRow.appendChild( cell );
            }

            var cell = document.createElement( self.tags.cell );
            
            cell.innerHTML = self.data[i][j];
            cell.className = self.classNames.classDataCell;
            
            if( self.cellRenderer !== null ) {
                /**
                 * If a cellRenderer function is available then
                 * invoke the same on the newly created Cell.
                 * 
                 * Pass to the function a value of "true" if this
                 * happens to be the part of the first row.
                 */
                cell = self.cellRenderer( cell, true, ( i === 0 ? true : false ), false );
            }
            
            /**
             * Append the Cell to the Row.
             */
            dataRow.appendChild( cell );

            /**
             * Append the Row to the Body Tag of the Table.
             */
            tbody.appendChild( dataRow );
        }
    }

    /**
     * Append the Table to the Container.
     */
    self.container.appendChild( table );
    
    /**
     * If a callback is available then
     * execute the same.
     */
    if( self.callback )
        self.callback.apply( this );
};
