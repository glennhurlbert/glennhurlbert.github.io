<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=iso-8859-1" />
<title>G. Hurlbert LinOpt Feedback Form</title>
<link rel="stylesheet" href="simple.css" type="text/css">

<style type="text/css">
<!--
body {
  background: #ccccff; 
}
.entry { 
  width: auto; 
  background: #DEF; 
  border: solid 1px black; 
  padding: 10px; 
  margin: 0 auto 15px; 
  text-align: left 
}
.name { 
  font-weight: bold; 
  float: left 
}
.info { 
  float: right; 
  margin-bottom: 1em 
}
.entry p { 
  clear: both; 
  margin-top: 0; 
  margin-bottom: 1em 
}
.date { 
  font-size: 10px; 
  text-align: right 
}
label { 
  float: left; 
  text-align: left; 
  width: 100px; 
  margin-left: 30px 
}
input, textarea { 
  width: 400px; 
  border: solid black 1px; 
  background: #ccccff; 
  font: 11px Verdana, Arial, Helvetica, sans-serif 
}
input.submit { 
  background: #9CF; 
  font-weight: bold; 
  width: auto;
}
#submit { 
  font-weight: bold; 
  margin-left: 130px; 
  text-align: left 
}
* html #submit { 
  margin-left: 133px 
}
form { 
  margin-bottom: 1em 
}
.spacer { 
  clear: both; 
  height: 5px 
}
-->
</style>

	<script type="text/javascript">
		function populate(o)
		{
			d=document.getElementById('de');
			if(!d){return;}			
			var mitems=new Array();
			mitems['General']=['General'];
			mitems['0']=['0'];
			mitems['1']=['1','2','3','4','5'];
			mitems['2']=['1','2','3','4','5','6','7','8','9','10'];
			mitems['3']=['1','2','3','4','5'];
			mitems['4']=['1','2','3','4','5'];
			mitems['5']=['1','2','3','4','5'];
			mitems['6']=['1','2','3','4','5'];
			mitems['7']=['1','2','3','4','5'];
			mitems['8']=['1','2','3','4','5'];
			mitems['9']=['1','2','3','4','5'];
			mitems['10']=['1','2','3','4','5'];
			mitems['11']=['1','2','3','4','5'];
			mitems['12']=['1','2','3','4','5'];
			mitems['13']=['1','2','3','4','5'];
			mitems['A']=['A'];
			mitems['B']=['B'];
			mitems['C']=['C'];
			mitems['D']=['D'];
			mitems['E']=['E'];
			d.options.length=0;
			cur=mitems[o.options[o.selectedIndex].value];
			if(!cur){return;}
			d.options.length=cur.length;
			for(var i=0;i<cur.length;i++)
			{
				d.options[i].text=cur[i];
				d.options[i].value=cur[i];
			}
		}
    </script>
</head>

<body>

<a class="phead">LinOpt Feedback Form</a><p>

<table>

<tr>
<td align="right" valign="top" width="100">
<a class="normalb">Readme &nbsp;</a>
</td>
<td>
<a class="normal">
  Your feedback on
</a>
<a class="menu" href="http://mingus.la.asu.edu/~hurlbert/LinOpt.html" target="below">
  Linear Optimization: The Simplex Workbook
</a>
<a class="normal">
  is very much appreciated.
  Your anonymous comments, suggestions, and corrections will help me 
  improve its contents in order to serve you and your students better.
</a>
</td>
</tr>

<tr>
<td align="right" valign="top" width="100">
<a class="normalb">&nbsp;</a>
</td>
<td>
<a class="normal">
  Please do not refer to page numbers, since those of my version will 
  not match those of yours.
  Instead, refer to Chapter, Section, Theorem, Workout, and Exercise
  numbers, etc.
</a>
</td>
</tr>

<tr>
<td align="right" valign="top" width="100">
<a class="normalb">&nbsp;</a>
</td>
<td>
<a class="normal">
  <b>Also, please try not to duplicate entries already posted below.</b>
</a>
</td>
</tr>

<tr>
<td align="right" valign="top" width="100">
<a class="normalb">&nbsp;</a>
</td>
<td>
<a class="normal">
  &nbsp;
</a>
</td>
</tr>

<tr>
<td align="right" valign="top" width="100">
<a class="normalb">Input &nbsp;</a>
</td>
<td>

<div class="entry">
<form method="post" action="signbook.php">
<div class="spacer"></div>
<label><a class="normal"><b>Type:&nbsp;</b></a></label>
<select name="signername">
<option value=""></option>
<option value="Comment">Comment</option>
<option value="Suggestion">Suggestion</option>
<option value="Content Correction">Content Correction</option>
<option value="Typo Correction">Typo Correction</option>
</select>
<div class="spacer"></div>
<label><a class="normal"><b>Chapter:&nbsp;</b></a></label>
<select name="email" id="email" onchange="populate(this)">
		<option value=""></option>
		<option value="General">General</option>
		<option value="0">0</option>
		<option value="1">1</option>
		<option value="2">2</option>
		<option value="3">3</option>
		<option value="4">4</option>
		<option value="5">5</option>
		<option value="6">6</option>
		<option value="7">7</option>
		<option value="8">8</option>
		<option value="9">9</option>
		<option value="10">10</option>
		<option value="11">11</option>
		<option value="12">12</option>
		<option value="13">13</option>
		<option value="A">A</option>
		<option value="B">B</option>
		<option value="C">C</option>
		<option value="D">D</option>
		<option value="E">E</option>
	</select>
<div class="spacer"></div>
<label><a class="normal"><b>Section:&nbsp;</b></a></label>
<select name="url" id="de">
	</select>
<div class="spacer"></div>
<label><a class="normal"><b>Message:&nbsp;</b></a></label>
<textarea name="message" rows="5" cols="20"></textarea>
<input type="hidden" name="bookurl" value="http://mingus.la.asu.edu/~hurlbert/feedback/mat_419.php" />
<div class="spacer"></div>
<div id="submit"><input type="submit" name="submit" value="Submit" class="submit" />
</div>
</form>
</div>

</td>
</tr>

</table>

</body>

</html>

