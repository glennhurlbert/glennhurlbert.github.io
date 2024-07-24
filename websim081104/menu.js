var cssRules;
if (document.all) {
    cssRules = 'rules';
} else if (document.getElementById) {
    cssRules = 'cssRules';
}

function pivotEntry() {
    var m = document.getElementById("main");

    while (activeItem.div.nextSibling) {
        m.removeChild(activeItem.div.nextSibling);
    }

    activeItem.tb.childNodes[activeRow].childNodes[activeColumn].firstChild.deactivate();


    activeItem.updateTableau();
    //    var tmp = new Item(activeItem.tableau, activeItem.type, activeItem.num + 1, activeItem.basicVar, new cloneObject(activeItem.freeVars), new cloneObject(activeItem.equalRows), activeItem.colLines, activeItem.rowLines);
    var tmp = new Item(activeItem);

    //    var tmp = new clone(activeItem);
    //    activeItem.updateTableau();
    activeItem = tmp;

    m.appendChild(tmp.div);

    activeItem.pivot();
    activeItem.updateTb();
    updateAllLines();

    var piv = activeItem.div.childNodes[0];
    r = (activeRow - 1) / 2 + 1;
    c = (activeColumn - 1) / 2 + 1;
    piv.innerHTML = "Pivoted on row " + r + " column " + c;
    activeItem.div.insertBefore(piv, activeItem.table);

    scroll(0, findPosY(activeItem.div));
}



function highlightEntry() {
    var e = activeItem.tb.childNodes[activeRow].childNodes[activeColumn].firstChild;
    e.highlighted = (!e.highlighted);
    updateCellHighlight(activeRow, activeColumn);
}

function fillEntry(x) {
    var e = activeItem.tb.childNodes[activeRow].childNodes[activeColumn].childNodes[0];
    e.setAttribute("value", x);
}


/**************************/


function highlightColumn() {
    var e = activeItem.tb.childNodes[0].childNodes[activeColumn].firstChild;
    e.highlighted = (!e.highlighted);
    updateColHighlight(activeColumn);
}

function deleteColumn() {
    activeItem.deleteColumn(activeColumn);
}

function addColumnAfter() {
    activeItem.addColumnAfter(activeColumn);
    activeColumn = activeColumn + 2;
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].activate();
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].focus();
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].select();
}

function addColumnBefore() {
    activeItem.addColumnBefore(activeColumn);
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].activate();
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].focus();
    activeItem.tb.childNodes[1].childNodes[activeColumn].childNodes[0].select();
}

function fillColumn(num) {
    for (var i = 1; i < activeItem.tb.childNodes.length; i++) {
        activeItem.tb.childNodes[i].childNodes[activeColumn].childNodes[0].value = num;
    }
}

function markAsFree() {
    activeItem.freeVars[(activeColumn - 1) / 2] = 1;   // 0=not free, 1=free not in basis, 2=free and in basis
    activeItem.tb.childNodes[0].childNodes[activeColumn].firstChild.innerHTML = "F";
    activeItem.tb.childNodes[0].childNodes[activeColumn].firstChild.className = "red columnBtn";
}



/**************************/


function highlightRow() {
    var e = activeItem.tb.childNodes[activeRow].childNodes[0].firstChild;
    e.highlighted = (!e.highlighted);
    updateRowHighlight(activeRow);
}

function deleteRow() {
    activeItem.delRow(activeRow);
}

function addRowAfter() {
    activeItem.addRowAfter(activeRow);
    activeRow = activeRow + 2;
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].activate();
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].focus();
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].select();
}

function addRowBefore() {
    activeItem.addRowBefore(activeRow);
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].activate();
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].focus();
    activeItem.tb.childNodes[activeRow].childNodes[1].childNodes[0].select();
}

function fillRow(num) {
    for (var j = 1; j < activeItem.tb.childNodes[activeRow].childNodes.length; j++) {
        activeItem.tb.childNodes[activeRow].childNodes[j].childNodes[0].value = num;
    }
}

function markAsEquality() {
    activeItem.equalRows[(activeRow - 1) / 2] = 1;   // 0=not free, 1=free not in basis, 2=free and in basis
    activeItem.tb.childNodes[activeRow].childNodes[0].firstChild.innerHTML = "E";
    activeItem.tb.childNodes[activeRow].childNodes[0].firstChild.className = "red rowBtn";
}


/**********************/


function highlightTableau() {
    var e = activeItem.tb.childNodes[0].childNodes[0].firstChild;
    e.highlighted = (!e.highlighted);
    updateTableauHighlight();
}

function wider() {
    var w = getStyleByClassName('.inpt', 'width');
    if (w == '34px') {
        setColWidth('60');
    } else if (w == '64px') {
        setColWidth('100');
    } else if (w == '104px') {
        setColWidth('150');
    }
}

function thinner() {
    var w = getStyleByClassName('.inpt', 'width');
    if (w == '64px') {
        setColWidth('30');
    } else if (w == '104px') {
        setColWidth('60');
    } else if (w == '154px') {
        setColWidth('100');
    }
}

function fillTableau(num) {
    for (var i = 1; i < activeItem.tb.childNodes.length; i++) {
        for (var j = 1; j < activeItem.tb.childNodes[i].childNodes.length; j++) {
            activeItem.tb.childNodes[i].childNodes[j].childNodes[0].value = num;
        }
    }
}

function setColWidth(w) {
    var cssRules;
    if (document.all) {
        cssRules = 'rules';
    } else if (document.getElementById) {
        cssRules = 'cssRules';
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
        for (var j = 0; j < document.styleSheets[i][cssRules].length; j++) {
            var t = document.styleSheets[i][cssRules][j].selectorText;
            if (t == '.inpt') {
                w4 = parseInt(w) + 4;
                document.styleSheets[i][cssRules][j].style['width'] = w4 + "px";
            } else if ((t == '.tableauBtn') || (t == '.rowBtn') || (t == '.columnBtn')) {
                document.styleSheets[i][cssRules][j].style['width'] = w + "px";
            }
        }
    }
}




/**********************/



function promptSize() {
    var d = document.getElementById("sizePrompt");
    var left = findPosX(activeItem.table);
    var top = findPosY(activeItem.table);

    d.style.left = left + "px";
    d.style.top = top + "px";

    hideActiveTb();
    d.style.visibility = "visible";

    document.getElementById('eVariables').focus();
}

function promptValidate() {
    var vars = document.getElementById("eVariables").value;
    var cons = document.getElementById("eConstraints").value;
    var form = document.getElementById("editform");
    var sign = '';                         // ( Inequalities | Equalities | Empty )
    var type = '';                         // ( LOP | System )

    for (i = 0; i <= 2; i++) {
        if (document.editform.sign[i].checked == true) {
            sign = document.editform.sign[i].value;
        }
    }
    for (j = 0; j <= 1; j++) {
        if (document.editform.type[j].checked == true) {
            type = document.editform.type[j].value;
        }
    }

    if (((vars != '') && (cons != '') && (sign != '') && (type != '')) || (sign == "Empty")) {
        fill_tableau(vars, cons, sign, type);
    }
}

function copyValidate() {
    var t = document.getElementById("cTextarea").value;
    var r = document.getElementById("cRows").value;
    var c = document.getElementById("cColumns").value;
    if ((t != '') && (r != '') && (c != '')) {
        hideCopyPaste();
        hideSizePrompt();
        create_tableau(t, r, c);
    }
}

/*
function validate(element,a,b,c) {
   if ((element.childNodes[a].value != '') && (element.childNodes[b].value != '') && (element.childNodes[c].value != '')) {
      return true;
   }
   return false;
}
*/

function choose_empty(v, c) {
    deselectRadio(document.forms['editform'].elements['sign']);
    deselectRadio(document.forms['editform'].elements['type']);
    v = parseInt(v);
    c = parseInt(c);
    //var tableau = new Array();
    copyPasteTableau(v, c);
}

function fill_tableau(vars, cons, sign, type) {
    document.getElementById('sizePrompt').style.visibility = "hidden";
    v = parseInt(vars);
    c = parseInt(cons);
    var tableau = new Array();
    var equalRows = new Array();
    var freeVars = new Array();
    var i, j;

    if (type == "LOP") {
        if (sign == "Inequalities") {
            activeItem.num = -1;
            activeItem.div.parentNode.removeChild(activeItem.div);
            for (i = 0; i <= c; i++) {
                equalRows[i] = 0;
                tableau[i] = new Array();
                for (j = 0; j <= v + c + 1; j++) {
                    freeVars[j] = 0;
                    tableau[i][j] = '';
                    if ((j >= v) && (j <= v + c)) {
                        if (i == j - v) {
                            tableau[i][j] = 1;
                        } else {
                            tableau[i][j] = 0;
                        }
                    }
                }
            }
            tableau[c][v + c + 1] = 0;
            newTableau(tableau, type, equalRows, freeVars);
        } else if (sign == "Equalities") {
            activeItem.num = -1;
            activeItem.div.parentNode.removeChild(activeItem.div);
            for (i = 0; i <= c; i++) {
                equalRows[i] = 1;
                tableau[i] = new Array();
                for (j = 0; j <= v + 1; j++) {
                    freeVars[j] = 0;
                    tableau[i][j] = '';
                    if (j == v) {
                        if (i == c) {
                            tableau[i][j] = 1;
                        } else {
                            tableau[i][j] = 0;
                        }
                    }
                }
            }
            tableau[c][v + 1] = 0;
            newTableau(tableau, type, equalRows, freeVars);
        }
    } else if (type == "System") {
        if (sign == "Inequalities") {
            activeItem.num = -1;
            activeItem.div.parentNode.removeChild(activeItem.div);
            for (i = 0; i < c; i++) {
                equalRows[i] = 0;
                tableau[i] = new Array();
                for (j = 0; j < v + c + 1; j++) {
                    freeVars[j] = 0;
                    tableau[i][j] = '';
                    if ((j >= v) && (j < v + c)) {
                        if (i == j - v) {
                            tableau[i][j] = 1;
                        } else {
                            tableau[i][j] = 0;
                        }
                    }
                }
            }
            newTableau(tableau, type, equalRows, freeVars);
        } else if (sign == "Equalities") {
            activeItem.num = -1;
            activeItem.div.parentNode.removeChild(activeItem.div);
            for (i = 0; i < c; i++) {
                equalRows[i] = 1;
                tableau[i] = new Array();
                for (j = 0; j < v + 1; j++) {
                    freeVars[j] = 0;
                    tableau[i][j] = '';
                }
            }
            newTableau(tableau, type, equalRows, freeVars);
        }
    }
}

function create_tableau(t, r, c) {
    showActiveTb();
    var tableau = get_tableau(t, r, c);

    var m = document.getElementById("main");

    while (m.childNodes.length > 0) {
        m.removeChild(m.firstChild);
    }
//    activeItem.num = -1;

//    var params = {};
//    params.tableau = tableau;
//    activeItem = new Item(params);
    activeItem = new Item({ tableau: tableau, numRows: r, numCols: c });
    m.appendChild(activeItem.div);

    scroll(0, 0);
}

function copyPasteTableau(v, c) {
    var str = '';
    for (var i = 0; i < activeItem.tableau.length; i++) {
        for (var j = 0; j < activeItem.tableau[i].length; j++) {
            var val = activeItem.tableau[i][j];
            str += " " + printf(val, 6);
        }
        str += "\n";
    }

    document.getElementById("cTextarea").value = str;

    hideActiveTb();
    showCopyPaste();
}

function cancelCopyPaste() {
    document.getElementById("copyPaste").style.visibility = "hidden";
    document.getElementById('cTextarea').style.visibility = "hidden";
    showActiveTb();
}


function parse_tableau(r, c, d) {
    var data = d.split(/,/);
    var tableau = new Array();
    for (var i = 0; i < r; i++) {
        tableau[i] = new Array();
        for (var j = 0; j < c; j++) {
            tableau[i][j] = parseInt(data[i * c + j], 10);
            if (typeof tableau[i][j] == 'undefined') {
                tableau[i][j] = '';
            }
        }
    }

    return tableau;
}


function get_tableau(t, r, c) {
    t = t.replace(/^[^\d\-]+/g, "");
    var data = t.split(/[^\d\-]+/);

    return data.join(",");
/*
    var rows = parseInt(r, 10);
    var cols = parseInt(c, 10);

    var tableau = new Array();
    for (var i = 0; i < rows; i++) {
        tableau[i] = new Array();
        for (var j = 0; j < cols; j++) {
            tableau[i][j] = data[i * cols + j];
            if (typeof tableau[i][j] == 'undefined') {
                tableau[i][j] = '';
            }
        }
    }
    return tableau;
*/
}

function copyTableauNewWindow() {
    var tableauData = activeItem.tableau[0].join(",");

    for (var i = 1; i < activeItem.tableau.length; i++) {
        tableauData += "," + activeItem.tableau[i].join(",");
    }
    window.open(getBaseURL(window.location.href) +
                "?title=" + title + chars[counter++] +
                "&tableau=" + tableauData +
                "&numRows=" + activeItem.tableau.length +
                "&numCols=" + activeItem.tableau[0].length +
                "&type=" + activeItem.type +
//                "&num=" + activeItem.num + 
                "&basicVar=" + activeItem.basicVar +
                "&freeVars=" + activeItem.freeVars.join(",") +
                "&colLines=" + activeItem.colLines.join(",") +
                "&rowLines=" + activeItem.rowLines.join(",") +
                "&equalRows=" + activeItem.equalRows.join(",") +
                "&bases=" + activeItem.bases.join(",") +
                "");
}

function newTableauTabFormat() {
    window.open(getBaseURL(window.location.href) + "?title=" + title + chars[counter++]);
}

function newTableauPasteFormat() {
    window.open(getBaseURL(window.location.href) + "?type=copypaste&title=" + title + chars[counter++]);
}

function newTableau(tableau, type, equalRows, freeVars) {
    var w = 1;

    var m = document.getElementById("main");
    while (m.childNodes.length > 0) {
        m.removeChild(m.firstChild);
    }
    activeItem.num = -1;
    activeItem.tableau = tableau;
    activeItem.type = type;
    activeItem.equalRows = equalRows;
    activeItem.freeVars = freeVars;

    activeItem = new Item(activeItem);

    m.appendChild(activeItem.div);
    scroll(0, 0);
}

function deactivateAll() {
    for (var i = 1; i < activeItem.tb.childNodes.length; i++) {
        for (var j = 1; j < activeItem.tb.childNodes[i].childNodes.length; j++) {
            activeItem.tb.childNodes[i].childNodes[j].childNodes[0].deactivate();
        }
    }
}

function convertToLaTeX() {
    var o = '\\left[\\begin{array}{';
    var i, j;
    for (j = 1; j < activeItem.tb.childNodes[0].childNodes.length; j++) {
        if (j % 2 == 0) {
            if (activeItem.colLines[(j - 2) / 2] == true) {
                o += '|';
            }
        } else {
            o += 'r';
        }
    }
    o += '}\n';
    for (i = 1; i < activeItem.tb.childNodes.length; i++) {
        if (i % 2 == 0) {
            if (activeItem.rowLines[(i - 2) / 2] == true) {
                o += '\\hline\n';
            }
        } else {
            o += activeItem.tb.childNodes[i].childNodes[1].firstChild.value;
            for (j = 3; j < activeItem.tb.childNodes[i].childNodes.length; j = j + 2) {
                o += '&' + activeItem.tb.childNodes[i].childNodes[j].firstChild.value;
            }
            o += '\\\\\n';
        }
    }
    o += '\\end{array}\\right]';
    hideActiveTb();
    showInfoText();
    document.getElementById('infoTextarea').innerHTML = o;
}

function convertToMaple() {
   var t = activeItem.tableau;
   var o = 'Matrix(' + t.length + ',' + t[0].length + ',\n';

   // firstline
   o += '[ [' + t[0].join(",") + '],\n';

   // middle lines
   for (var i = 1; i < t.length - 1; i++) {
      o += '  [' + t[i].join(",") + '],\n';
   }

   // last line
   o += '  [' + t[t.length - 1].join(",") + '] ]);';

   hideActiveTb();
   showInfoText();
   document.getElementById('infoTextarea').innerHTML = o;
}

function showActiveTb() {
   activeItem.tb.style.visibility = "visible";
}

function hideActiveTb() {
   activeItem.tb.style.visibility = "hidden";
}

function updateCellHighlight(r,c) {
   if ((activeItem.tb.childNodes[r].childNodes[c].firstChild.highlighted == true)
    || (activeItem.tb.childNodes[r].childNodes[0].firstChild.highlighted == true)
    || (activeItem.tb.childNodes[0].childNodes[0].firstChild.highlighted == true)
    || (activeItem.tb.childNodes[0].childNodes[c].firstChild.highlighted == true)) {
      activeItem.tb.childNodes[r].childNodes[c].firstChild.highlight();
   } else {
      activeItem.tb.childNodes[r].childNodes[c].firstChild.unhighlight();
   }
}

function updateColHighlight(c) {
   for (i = 1; i < activeItem.tb.childNodes.length; i = i + 2) {
      if ((activeItem.tb.childNodes[0].childNodes[c].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[i].childNodes[0].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[0].childNodes[0].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[i].childNodes[c].firstChild.highlighted == true)) {
         activeItem.tb.childNodes[i].childNodes[c].firstChild.highlight();
      } else {
         activeItem.tb.childNodes[i].childNodes[c].firstChild.unhighlight();
      }
   }
}

function updateRowHighlight(r) {
   for (j = 1; j < activeItem.tb.childNodes[r].childNodes.length; j = j + 2) {
      if ((activeItem.tb.childNodes[r].childNodes[0].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[0].childNodes[j].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[0].childNodes[0].firstChild.highlighted == true)
       || (activeItem.tb.childNodes[r].childNodes[j].firstChild.highlighted == true)) {
         activeItem.tb.childNodes[r].childNodes[j].firstChild.highlight();
      } else {
         activeItem.tb.childNodes[r].childNodes[j].firstChild.unhighlight();
      }
   }
}

function updateTableauHighlight() {
   for (i = 1; i < activeItem.tb.childNodes.length; i = i + 2) {
      updateRowHighlight(i);
   }
}

function updateAllLines() {
   for (var i = 0; i < activeItem.colLines.length; i++) {
      if (activeItem.colLines[i] == true) {
         updateColLines(i);
      }
   }

   for (var j = 0; j < activeItem.rowLines.length; j++) {
      if (activeItem.rowLines[j] == true) {
         updateRowLines(j);
      }
   }
}

function updateLines(type, num) {
   (type == "col") ? updateColLines(num) : updateRowLines(num);
}

function updateColLines(c) {
   for (i = 1; i < activeItem.tb.childNodes.length; i++) {
      if ((activeItem.colLines[c] == true) || (activeItem.rowLines[(i-2)/2] == true)) {
            activeItem.tb.childNodes[i].childNodes[2*c+2].firstChild.style.backgroundColor = '#000000';
      } else {
         activeItem.tb.childNodes[i].childNodes[2*c+2].firstChild.style.backgroundColor = '#ffffff';
      }
   }
}

function updateRowLines(r) {
   for (j = 1; j < activeItem.tb.childNodes[2*r+2].childNodes.length; j++) {
      if ((activeItem.rowLines[r] == true) || (activeItem.colLines[(j-2)/2] == true)) {
         activeItem.tb.childNodes[2*r+2].childNodes[j].firstChild.style.backgroundColor = '#000000';
      } else {
         activeItem.tb.childNodes[2*r+2].childNodes[j].firstChild.style.backgroundColor = '#ffffff';
      }
   }
}

function updateTableauLines() {
   for (i = 0; i < (activeItem.tb.childNodes.length - 2) / 2; i++) {
      updateRowLines(i);
   }
   for (j = 0; j < (activeItem.tb.childNodes[0].childNodes.length - 2) / 2; j++) {
      updateColLines(j);
   }
}

function wasEscPressed(e) {

   // MSIE or Firefox?
   var kC = (window.event) ? window.event.keyCode : e.keyCode; 
   // MSIE : Firefox
   var Esc = (window.event) ? 27 : e.DOM_VK_ESCAPE
   if (kC == Esc) {
      deactivateAll();
   }
}

