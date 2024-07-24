<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<meta http-equiv="Content-Language" content="en-us">
<title>Menu</title>
<link rel="stylesheet" href="simple.css" type="text/css">
</head>


<body background="backs/Pebbles4.jpg">

<p align="right">
<a class="host">
You are visitor
</a>
<br>
<a class="hostbig">
   <font size ="+0"><b><?
   $fd= fopen("counter.txt","r+");
         $bla=fscanf($fd,"%d\n", $var);
         $var=$var+1;
         echo $var;
         fseek($fd,0);
         fwrite($fd,"$var");
         fclose($fd)
         ?></b></font><br>
</a>
<a class="host">
since Jan 1, 2006.
</a>
</p>

</body>

</html>

