/**
 * Class Item - contains a tableau, a table, a div
 */

function Item(tableau, type, num, basicVar, freeVars, equalRows, colLines, rowLines) {
   if (typeof type == 'undefined') { type = "LOP"; }
   if (typeof num == 'undefined') { num = 0; }
   if (typeof basicVar == 'undefined') { basicVar = 1; }
   if (typeof freeVars == 'undefined') { freeVars = new Array(); }
   if (typeof equalRows == 'undefined') { equalRows = new Array(); }
   if (typeof rowLines == 'undefined') {
      rowLines = new Array();
      for (i = 0; i < tableau.length-1; i++) {
         rowLines[i] = false;
      }
   }
   if (typeof colLines == 'undefined') {
      colLines = new Array();
      for (j = 0; j < tableau[0].length-1; j++) {
         colLines[j] = false;
      }
   }

   this.tableau = tableau;
   this.type = type;
   this.num = num;
   this.basicVar = basicVar;
   this.freeVars = freeVars;
   this.colLines = colLines;
   this.rowLines = rowLines;
   this.equalRows = equalRows;
   this.bases = new Array();


   Item.prototype.findBases = function() {
      for (var j = 0; j < this.tableau[0].length; j++) {
         var nonzero_vals = 0;
         var nonzero_row = -1;
         for (var i = 0; i < this.tableau.length; i++) {
            if (this.tableau[i][j] != 0) {
               nonzero_vals++;
               nonzero_row = i;
            }
         }
         if (nonzero_vals == 1) {
            this.bases[nonzero_row] = j;
         }
      }
   }

   Item.prototype.updateTb = function() {
      for (var i = 1; i < this.tb.childNodes.length; i++) {
         if (i % 2 == 1) {
            for (var j = 1; j < this.tb.childNodes[i].childNodes.length; j++) {
               if (j % 2 == 1) {
                  this.tb.childNodes[i].childNodes[j].childNodes[0].value = this.tableau[(i-1)/2][(j-1)/2];
               }
            }
         }
      }
   }

   Item.prototype.updateTableau = function() {
      var t = new Array();
      for (var i = 0; i < (this.tb.childNodes.length - 1) / 2; i++) {
         t[i] = new Array();
         for (var j = 0; j < (this.tb.childNodes[i].childNodes.length - 1) / 2; j++) {
            t[i][j] = parseInt(this.tb.childNodes[i*2 + 1].childNodes[j*2 + 1].firstChild.value);
         }
      }
      this.tableau = t;
   }

   Item.prototype.createTable = function() {
      this.table = document.createElement("table");
      this.table.setAttribute("class","table");
      this.table.setAttribute("className","table");
      this.table.setAttribute("cellspacing",0);
   }
   Item.prototype.createTb = function() {
      this.tb = document.createElement("tbody");
      var tr, td, inpt;

      // First Row
      tr = this.tb.insertRow(0);
      td = tr.insertCell(0);
      this.newButton(td,-1,-1,"tableau");
      for (var j = 0; j < this.tableau[0].length; j++) {
         td = tr.insertCell(tr.cells.length);
         this.newButton(td,-1,j,"column");

         if (j != this.tableau[0].length - 1) {
            td = tr.insertCell(tr.cells.length);
            td.appendChild(this.newLineButton("col", j, this));
         }
      }

      // Remaining Rows
      for (var i = 0; i < this.tableau.length; i++) {
         tr = this.tb.insertRow(this.tb.rows.length);
         td = tr.insertCell(tr.cells.length);
         this.newButton(td,i,-1,"row");

         for (var j = 0; j < this.tableau[i].length; j++) {
            td = tr.insertCell(tr.cells.length);
            td.setAttribute('align','center');
            td.appendChild(this.newInput(this.tableau[i][j],i,j,"entry"));

            if (j != this.tableau[i].length - 1) {
               td = tr.insertCell(tr.cells.length);
               td.appendChild(this.newLine("col"));
            }
         }

         if (i != this.tableau.length - 1) {
            tr = this.tb.insertRow(this.tb.rows.length);
            td = tr.insertCell(tr.cells.length);
            td.appendChild(this.newLineButton("row", i, this));
            for (var j = 0; j < this.tableau[i].length; j++) {

               td = tr.insertCell(tr.cells.length);
               td.appendChild(this.newLine("row"));

               if (j != this.tableau[i].length - 1) {
                  td = tr.insertCell(tr.cells.length);
                  td.appendChild(this.newLine("colLine row"));
               }
            }
         }
      }
   }

   Item.prototype.newLineButton = function(type, num, item) {
      var d = document.createElement('div');
      d.type = type;
      d.num = num;
      d.item = item;
      d.className = type + "LineBtn";
      d.onclick = function() {
         activeItem = this.item;
        
         if (this.type == 'col') {
            this.item.colLines[this.num] = (! this.item.colLines[this.num]);
         }  else {
            this.item.rowLines[this.num] = (! this.item.rowLines[this.num]);
         }
         updateLines(this.type,this.num);
      }
      return d;
   }

   Item.prototype.newLine = function(type) {
      var d = document.createElement('div');
      d.className = type + "Line";
      return d;
   }

   Item.prototype.newButton = function(td,row,col,kind) {
      div = document.createElement("div");
      div.setAttribute("class",kind + "Btn");
      div.setAttribute("className",kind + "Btn");
      if (kind == "tableau") {
         div.innerHTML = "T&nbsp;" + this.num;
      } else {
         div.innerHTML = "&nbsp;";
      }
      div.row = row;
      div.col = col;
      div.kind = kind;
      div.item = this;
      div.highlighted = false;

      if (col >= 0) {
         if (this.freeVars[col] == 1) {
            div.innerHTML = "F";
            div.className = "red columnBtn";
         } else if (this.freeVars[col] == 2) {
            div.innerHTML = "F";
            div.className = "green columnBtn";
         }
      }
      if (row >= 0) {
         if (this.equalRows[row] == 1) {
            div.innerHTML = "E";
            div.className = "red rowBtn";
         } else if (this.equalRows[row] == 2) {
            div.innerHTML = "E";
            div.className = "green rowBtn";
         }
      }
            
   
      div.onclick = function () {
         activeItem = this.item;
         if (kind == "tableau") {
         } else if (kind == "column") {
            activeColumn = this.col * 2 + 1;
         } else if (kind == "row") {
            activeRow = this.row * 2 + 1;
         }
      }
   
      div.onrightclick = function() {
         activeItem = this.item;
         activeColumn = this.col * 2 + 1;
         activeRow = this.row * 2 + 1;
      }

      div.oncontextmenu = showmenu;

      td.appendChild(div);
   }

   Item.prototype.newInput = function(val,row,col,kind) {
      var inpt = document.createElement("input");
      inpt.setAttribute("type","text");
      inpt.setAttribute("value", val);
      //inpt.setAttribute("value", row.toString() + "," + col.toString());
      inpt.setAttribute("class","inpt");
      inpt.setAttribute("className","inpt");
      inpt.setAttribute("tabindex",0);
      inpt.setAttribute("autocomplete","off");
      inpt.row = row;
      inpt.col = col;
      inpt.kind = kind;
      inpt.item = this;
      inpt.highlighted = false;

      inpt.onclick = function(e) {
         this.activate();
      }

      inpt.onfocus = function(e) {
         this.activate();
      }

      inpt.onblur = function(e) {
          this.deactivate();
      }

      inpt.onchange = function() {
         activeItem.tableau[this.row][this.col] = this.value;
      }

      inpt.ondblclick = function(e) {
         activeItem = this.item;
         activeRow = this.row * 2 + 1;
         activeColumn = this.col * 2 + 1;
         pivotEntry();
         this.deactivate();
      }

      inpt.highlight = function() {
         //this.parentNode.style.backgroundColor = '#ffdd99';
         //this.style.borderColor = '#ffdd99';
         this.style.backgroundColor = '#ffdd99';
         this.style.fontWeight = 'bold';
      }

      inpt.unhighlight = function() {
         //this.parentNode.style.backgroundColor = '#ffffff';
         //this.style.borderColor = '#ffffff';
         this.style.backgroundColor = '#ffffff';
         this.style.fontWeight = 'normal';
      }

      inpt.activate = function() {
         activeItem = this.item;
         this.style.borderColor = "#000000";
         this.select();
      }

      inpt.deactivate = function() {
         this.style.borderColor = "#ffffff";
      }

      inpt.oncontextmenu = showmenu;

      inpt.onkeydown = function(e) {
         activeItem = this.item;
         rows = activeItem.tableau.length;
         cols = activeItem.tableau[0].length;
         var r = 0;
         var c = 0;
         var key = getKey(e);
         if (key == 37) { // left
            r = this.row + 1;
            if (this.col == 0) {
               c = cols;
            } else {
               c = this.col;
            }
         } else if (key == 38) { // up
            c = this.col + 1;
            if (this.row == 0) {
               r = rows;
            } else {
               r = this.row;
            }
         } else if (key == 39) { // right
            r = this.row + 1;
            if (this.col == cols - 1) {
               c = 1;
            } else {
               c = (this.col + 2);
            }
         } else if (key == 40) { // down
            c = this.col + 1;
            if (this.row == rows - 1) {
               r = 1;
            } else {
               r = this.row + 2;
            }
         }
         if ((r != 0) && (c != 0)) {
            activeItem.tb.childNodes[r*2-1].childNodes[c*2-1].childNodes[0].activate();
         }
         //return false;
      }

      inpt.onkeypress = function (e) {
         var key = getKey(e);
         if ((key >= 37) && (key <= 40)) {
            return false;
         }
      }
      inpt.onkeyup = function (e) {
         var key = getKey(e);
         if ((key >= 37) && (key <= 40)) {
            return false;
         }
      }

      return inpt;
   }

   Item.prototype.addColumnBefore = function(c) {
      tr = this.tb.childNodes[0];

      // new Buttons
      this.newButton(tr.insertCell(c),-1,(c-1)/2,"column");
      tr.insertCell(c+1).appendChild(this.newLineButton("col",(c-3)/2,this));

      // new inputs and lines
      for (var i = 1; i < this.tb.childNodes.length; i++) {
         tr = this.tb.childNodes[i];
         if (i % 2 == 1) {
            tr.insertCell(c).appendChild(this.newInput("0",(i-1)/2,(c-1)/2,"entry"));
            tr.insertCell(c+1).appendChild(this.newLine("col"));
         } else {
            tr.insertCell(c+1).appendChild(this.newLine("colLine row"));
            tr.insertCell(c+2).appendChild(this.newLine("row"));
         }
      }

      // update all following buttons and inputs
      for (var j = c+1; j < this.tb.childNodes[0].childNodes.length; j++) {
         if (j % 2 == 0) {
            this.tb.childNodes[0].childNodes[j].firstChild.num++;
         } else {
            this.tb.childNodes[0].childNodes[j].firstChild.col++;
            for (var i = 1; i < this.tb.childNodes.length; i = i + 2) {
               this.tb.childNodes[i].childNodes[j].firstChild.col++;
            }
         }
      }
      ccc = (c-1)/2
      this.colLines.splice(ccc, 0, false);
      updateTableauLines();
      updateTableauHighlight();
   }

   Item.prototype.addColumnAfter = function(c) {
      tr = this.tb.childNodes[0];

      tr.insertCell(c+1).appendChild(this.newLineButton("col",(c-3)/2,this));
      this.newButton(tr.insertCell(c+2),-1,(c-1)/2,"column");

      for (var i = 1; i < this.tb.childNodes.length; i++) {
         tr = this.tb.childNodes[i];
         if (i % 2 == 1) {
            tr.insertCell(c+1).appendChild(this.newLine("col"));
            tr.insertCell(c+2).appendChild(this.newInput("0",(i-1)/2,(c-1)/2,"entry"));
         } else {
            tr.insertCell(c+1).appendChild(this.newLine("colLine row"));
            tr.insertCell(c+2).appendChild(this.newLine("row"));
         }
      }

      for (var j = c+1; j < this.tb.childNodes[0].childNodes.length; j++) {
         if (j % 2 == 0) {
            this.tb.childNodes[0].childNodes[j].firstChild.num++;
         } else {
            this.tb.childNodes[0].childNodes[j].firstChild.col++;
            for (var i = 1; i < this.tb.childNodes.length; i++) {
               this.tb.childNodes[i].childNodes[j].firstChild.col++;
            }
         }
      }
      ccc = (c-1)/2;
      this.colLines.splice(ccc, 0, false);
      updateTableauLines();
      updateTableauHighlight();
   }

   Item.prototype.deleteColumn = function(c) {
      ccc = (c-1)/2;
      if (c == this.tb.childNodes[0].childNodes.length - 1) { c = c-1; }
         
      for (var i = 0; i < this.tb.childNodes.length; i++) {
         this.tb.childNodes[i].removeChild(this.tb.childNodes[i].childNodes[c]);
         this.tb.childNodes[i].removeChild(this.tb.childNodes[i].childNodes[c]);
         for (var j = c; j < this.tb.childNodes[i].childNodes.length; j++) {
            if ((j % 2 == 0) && (j != 0)) {
               this.tb.childNodes[i].childNodes[j].firstChild.num--;
            } else {
               this.tb.childNodes[i].childNodes[j].firstChild.col--;
            }
         }
      }
      if ((colLines[ccc] == false) || (ccc == 0) || (ccc == colLines.length)) {
         this.colLines.splice(ccc, 1);
      } else {
         this.colLines.splice(ccc-1, 1);
      }
      updateTableauLines();
      updateTableauHighlight();
   }

   Item.prototype.addRowBefore = function(r) {
      tr = this.tb.insertRow(r);
      this.newButton(tr.insertCell(0),(r-1)/2,-1,"row");

      for (var j = 1; j < (this.tb.childNodes[0].childNodes.length + 1) / 2; j++) {
         tr.insertCell(tr.cells.length).appendChild(this.newInput("0",r-1,j,"entry"));
         if (j != this.tb.childNodes[0].childNodes.length - 1) {
            tr.insertCell(tr.cells.length).appendChild(this.newLine("col"));
         }
      }
      tr = this.tb.insertRow(r+1);
      tr.insertCell(0).appendChild(this.newLineButton("row",(r-1)/2,this));

      for (var j = 1; j < (this.tb.childNodes[0].childNodes.length + 1) / 2; j++) {
         tr.insertCell(tr.cells.length).appendChild(this.newLine("row"));
         if (j != (this.tb.childNodes[0].childNodes.length) / 2) {
            tr.insertCell(tr.cells.length).appendChild(this.newLine("colLine row"));
         }
      }

      for (var i = r+2; i < this.tb.childNodes.length; i++) {
         if (i % 2 == 0) {
            this.tb.childNodes[i].childNodes[0].firstChild.num++;
         } else {
            this.tb.childNodes[i].childNodes[0].firstChild.row++;
            for (var j = 1; j < this.tb.childNodes[i].childNodes.length; j++) {
               this.tb.childNodes[i].childNodes[j].firstChild.col++;
            }
         }
      }
      rrr = (r-1)/2
      this.rowLines.splice(rrr, 0, false);
      updateTableauLines();
      updateTableauHighlight();
   }

   Item.prototype.addRowAfter = function(r) {
      tr = this.tb.insertRow(r+1);
      tr.insertCell(0).appendChild(this.newLineButton("row",(r-1)/2,this));

      for (var j = 1; j < (this.tb.childNodes[0].childNodes.length + 1) / 2; j++) {
         tr.insertCell(tr.cells.length).appendChild(this.newLine("row"));
         if (j != (this.tb.childNodes[0].childNodes.length) / 2) {
            tr.insertCell(tr.cells.length).appendChild(this.newLine("colLine row"));
         }
      }
      tr = this.tb.insertRow(r+2);
      this.newButton(tr.insertCell(0),(r-1)/2,-1,"row");

      for (var j = 1; j < (this.tb.childNodes[0].childNodes.length + 1) / 2; j++) {
         tr.insertCell(tr.cells.length).appendChild(this.newInput("0",r-1,j,"entry"));
         if (j != this.tb.childNodes[0].childNodes.length - 1) {
            tr.insertCell(tr.cells.length).appendChild(this.newLine("col"));
         }
      }

      for (var i = r+2; i < this.tb.childNodes.length; i++) {
         if (i % 2 == 0) {
            this.tb.childNodes[i].childNodes[0].firstChild.num++;
         } else {
            this.tb.childNodes[i].childNodes[0].firstChild.row++;
            for (var j = 1; j < this.tb.childNodes[i].childNodes.length; j++) {
               this.tb.childNodes[i].childNodes[j].firstChild.row++;
            }
         }
      }
      rrr = (r-1)/2
      this.rowLines.splice(rrr, 0, false);
      updateTableauLines();
      updateTableauHighlight();
   }

   Item.prototype.delRow = function(r) {
      rrr = (r-1)/2;
      if (r == this.tb.childNodes.length - 1) { r = r-1; }
      this.tb.removeChild(this.tb.childNodes[r]);
      this.tb.removeChild(this.tb.childNodes[r]);
      for (var i = r; i < this.tb.childNodes.length; i++) {
         if (i % 2 == 0) {
            this.tb.childNodes[i].childNodes[0].firstChild.num--;
         } else {
            this.tb.childNodes[i].childNodes[0].firstChild.row--;
            for (var j = 1; j < this.tb.childNodes[0].childNodes.length; j = j + 2) {
               this.tb.childNodes[i].childNodes[j].firstChild.row--;
            }
         }
      }
      if ((rowLines[rrr] == false) || (rrr == 0) || (rrr == rowLines.length)) {
         this.rowLines.splice(rrr, 1);
      } else {
         this.rowLines.splice(rrr-1, 1);
      }
      updateTableauLines();
      updateTableauHighlight();

   }

   Item.prototype.getBasicVar = function() {
      this.basicVar = 1;
      if (this.bases.length == tableau.length) {
         this.basicVar = this.tableau[0][this.bases[0]];
      }
   }

   Item.prototype.pivot = function() {
      var row = (activeRow - 1) / 2;
      var col = (activeColumn - 1) / 2;

      if (this.freeVars[col] == 1) {
         this.freeVars[col] = 2;
         activeItem.tb.childNodes[0].childNodes[activeColumn].firstChild.innerHTML = "F";
         activeItem.tb.childNodes[0].childNodes[activeColumn].firstChild.className = "green columnBtn";
      }
      if (this.equalRows[row] == 1) {
         this.equalRows[row] = 2;
         activeItem.tb.childNodes[activeRow].childNodes[0].firstChild.innerHTML = "E";
         activeItem.tb.childNodes[activeRow].childNodes[0].firstChild.className = "green rowBtn";
      }

      if (this.tableau[row][col] < 0) {
         for (var j = 0; j < this.tableau[row].length; j++) {
            this.tableau[row][j] *= -1;
         }
      }

      for (var i = 0; i < this.tableau.length; i++) {
         if (i != row) {
            var pivotrowval = this.tableau[i][col];
            for (var j = 0; j < this.tableau[i].length; j++) {
               this.tableau[i][j] = (this.tableau[row][col] * this.tableau[i][j] - pivotrowval * this.tableau[row][j]) / this.basicVar;
            }
         }
      }

      this.bases[row] = col;
      this.basicVar = tableau[row][col];
   }

   if (typeof basicVar == 'undefined') {
      this.findBases();
      this.getBasicVar();
   } else {
      this.basicVar = basicVar;
   }

   this.div = document.createElement("div");
   this.createTable();
   this.createTb();
   this.updateTb();

   this.table.appendChild(this.tb);
   this.div.appendChild(document.createElement("div"));
   this.div.appendChild(document.createElement("br"));
   this.div.appendChild(document.createElement("br"));
   this.div.appendChild(this.table);
}





