function getURLParam(strParamName){
    var strReturn = "";
    var strHref = window.location.href;
    if ( strHref.indexOf("?") > -1 ) {
        var strQueryString = strHref.substr(strHref.indexOf("?"));
        var aQueryString = strQueryString.split("&");
        for ( var iParam = 0; iParam < aQueryString.length; iParam++ ) {
            if ( aQueryString[iParam].indexOf(strParamName + "=") > -1 ) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    return strReturn;
}

function getBaseURL(url) {
   if (url.indexOf("?") != -1) {
      return url.substr(0,url.indexOf("?"));
   }
   return url;
}


function getMousePosX(e) {
   var posx = 0;
   if (!e) var e = window.event;
   if (e.pageX) {
      posx = e.pageX;
   } else if (e.clientX) {
      posx = e.clientX + document.body.scrollLeft;
   }
   return posx;
}

function getMousePosY(e) {
   var posy = 0;
   if (!e) var e = window.event;
   if (e.pageY) {
      posy = e.pageY;
   } else if (e.clientY) {
      posy = e.clientY + document.body.scrollTop;
   }
   return posy;
}

function findPosX(obj) {
   var curleft = 0;
   if (obj.offsetParent) {
      while (obj.offsetParent) {
         curleft += obj.offsetLeft
         obj = obj.offsetParent;
      }
   } else if (obj.x) {
      curleft += obj.x;
   }
   return curleft;
}



function findPosY(obj) {
   var curtop = 0;
   if (obj.offsetParent) {
      while (obj.offsetParent) {
         curtop += obj.offsetTop
         obj = obj.offsetParent;
      }
   } else if (obj.y) {
      curtop += obj.y;
   }
   return curtop;
}

function insertAfter(parent, node, referenceNode) {
  parent.insertBefore(node, referenceNode.nextSibling);
}

function printf(S, L) {
   var nS = '';
   for (var i = S.toString().length; i <= L; i++) {
      nS = nS + ' ';
   }
   var returnVal = nS + S.toString();
   return nS + S;
}

function getKey(e) {
   if (window.event) {
      return window.event.keyCode;
   } else if (e) {
      return e.keyCode;
   } else {
      return null;
   }
}

function getStyleByClassName(c,p) {
   for (var i = 0; i < document.styleSheets.length; i++) {
      for (var j = 0; j < document.styleSheets[i][cssRules].length; j++) {
         var t = document.styleSheets[i][cssRules][j].selectorText;
         if (t == c) {
            return document.styleSheets[i][cssRules][j].style[p];
         }
      }
   }
}

function deselectRadio(radioObj) {
   for (var i = 0; i < radioObj.length; i++) {
      radioObj[i].checked = false;
   }
}

function nap (m) {var then = new Date(new Date().getTime() + m); while (new Date() < then) {}}

function cloneObject(what) {
   for (i in what) {
      this[i] = what[i];
   }
}

function clone(deep) {
  var objectClone = new this.constructor();
  for (var property in this)
    if (!deep)
      objectClone[property] = this[property];
    else if (typeof this[property] == 'object')
      objectClone[property] = this[property].clone(deep);
    else
      objectClone[property] = this[property];
  return objectClone;
}