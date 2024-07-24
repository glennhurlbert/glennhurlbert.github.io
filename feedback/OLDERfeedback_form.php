<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=iso-8859-1" />
<title>G. Hurlbert LinOpt Feedback Form</title>
<link rel="stylesheet" href="simple.css" type="text/css">

<style type="text/css">
<!--
body { background: #9CF; font: 11px Verdana, Arial, Helvetica, sans-serif; text-align: center }
h1 { font-size: 2.5em; margin: 0 0 1em }
#navigate { width: 420px; text-align: left; margin: 0 auto 8px }
.entry { background: #DEF; border: solid 1px black; width: 400px; padding: 10px; margin: 0 auto 15px; text-align: left }
.name { font-weight: bold; float: left }
.info { float: right; margin-bottom: 1em }
.entry p { clear: both; margin-top: 0; margin-bottom: 1em }
.date { font-size: 10px; text-align: right }
label { float: left; text-align: left; font-weight: bold; width: 70px; margin-left: 60px }
input, textarea { width: 175px; background: #DEF; border: solid black 1px; background: #9CF; font: 11px Verdana, Arial, Helvetica, sans-serif }
input.submit { font-weight: bold; width: auto }
#submit { font-weight: bold; margin-left: 130px; text-align: left }
* html #submit { margin-left: 133px }
form { margin-bottom: 1em }
.spacer { clear: both; height: 5px }
a { color: #369; text-decoration: none; font-weight: bold }
a:hover { text-decoration: underline }
-->
</style>

	<script type="text/javascript">
		function populate(o)
		{
			d=document.getElementById('de');
			if(!d){return;}			
			var mitems=new Array();
			mitems['General']=['General'];
			mitems['0']=['1'];
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
			mitems['A']=['1'];
			mitems['B']=['1'];
			mitems['C']=['1'];
			mitems['D']=['1'];
			mitems['E']=['1'];
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

<h1>Input Feedback</h1>

<div id="navigate">
<p>
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
</p>
<p>
<a class="normal">
  Please do not refer to page numbers, since those of my version will 
  not match those of yours.
  Instead, refer to Chapter, Section, Theorem, Workout, and Exercise
  numbers, etc.
</a>
</p>
</div>

<div class="entry">
<form method="post" action="signbook.php">
<div class="spacer"></div>
<label>Type:</label>
<select name="signername">
<option value=""></option>
<option value="Comments">Comments</option>
<option value="Suggestions">Suggestions</option>
<option value="Content Errors">Content Errors</option>
<option value="Typos">Typos</option>
</select>
<div class="spacer"></div>
<label>Chapter:</label>
<select name="email" id="email" onchange="populate(this)">
		<option value=""></option>
		<option value="General">General</option>
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
	</select>
<div class="spacer"></div>
<label>Section:</label>
<select name="url" id="de">
	</select>
<div class="spacer"></div>
<label>Message:</label>
<textarea name="message" rows="5" cols="20"></textarea>
<input type="hidden" name="bookurl" value="http://mingus.la.asu.edu/~hurlbert/feedback/mat_419.php" />
<div class="spacer"></div>
<div id="submit"><input type="submit" name="submit" value="Submit" class="submit" />
</div>
</form>
</div>

</body>
</html>
