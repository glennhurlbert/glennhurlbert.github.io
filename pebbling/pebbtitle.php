<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<meta http-equiv="Content-Language" content="en-us">
<title>Menu</title>
<link rel="stylesheet" href="simple.css" type="text/css">
</head>


<body background="backs/Pebbles4.jpg">

<p class="head">
<a class="host">
Maintained by
</a>
<a class="host" href="http://mingus.la.asu.edu/~hurlbert" target="_blank">
  Glenn Hurlbert
</a>
</p>

<p class="ptitle">
<a class="atitle">
  the <NbSp> graph <Nbsp> pebbling <nbsp> page
</a>
</p>

<p class="count" align="right">
<a class="host">
You are visitor
</a>
<br>
<a class="hostbig">
   <?
   $fd= fopen("counter.txt","r+");
         $bla=fscanf($fd,"%d\n", $var);
         $var=$var+1;
         echo $var;
         fseek($fd,0);
         fwrite($fd,"$var");
         fclose($fd)
   ?>
</a>
<br>
<a class="host">
since Jan 1, 2006
</a>
</p>

</body>

</html>
