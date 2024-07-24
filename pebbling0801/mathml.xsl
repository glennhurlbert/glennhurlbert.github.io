
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:msxsl="urn:schemas-microsoft-com:xslt"
  xmlns:fns="http://www.w3.org/2002/Math/preference"
  xmlns:mml="http://www.w3.org/1998/Math/MathML"
  extension-element-prefixes="msxsl fns"
>

<!--
Copyright David Carlisle 2001, 2002.

Use and distribution of this code are permitted under the terms of the <a
href="http://www.w3.org/Consortium/Legal/copyright-software-19980720"
>W3C Software Notice and License</a>.
-->

<xsl:include href="ctop.xsl"/>
<xsl:include href="pmathml.xsl"/>

<xsl:output/>

<xsl:template match="/">
<xsl:choose>
<xsl:when test="system-property('xsl:vendor')='Transformiix'">
<xsl:apply-templates mode="c2p"/>
</xsl:when>
<!-- not working, currently
<xsl:when test="system-property('xsl:vendor')='Microsoft' and /*/@fns:renderer='css'">
<xsl:variable name="pmml">
<xsl:apply-templates mode="c2p"/>
</xsl:variable>
<xsl:apply-templates select="msxsl:node-set($pmml)/node()"/>
</xsl:when>
-->
<xsl:otherwise>
<xsl:apply-templates/>
</xsl:otherwise>
</xsl:choose>
</xsl:template> 
</xsl:stylesheet>

<!--

A.menu:link {text-decoration: none; color :#660000; font-weight: bold; font-family: Times; font-size: medium} 
A.menu:vlink {text-decoration: none; color :000000; font-weight: bold; font-family: Times; font-size: medium} 
A.menu:visited {text-decoration: none;color :660000; font-weight: bold; font-family: Times; font-size: medium} 
A.menu:hover {color: #000099; letter-spacing: 0; text-decoration:underline font-family: Times; font-size: medium} 

A.basic:link {text-decoration: none; color :#0000dd; font-weight: bold;} 
A.basic:vlink {text-decoration: none; color :000000; font-weight: bold;} 
A.basic:visited {text-decoration: none;color :0000dd; font-weight: bold;} 
A.basic:hover {color: #aa00aa; letter-spacing: 0; text-decoration:underline}

A.head:link {text-decoration: none; color :#009900; font-size: small}
A.head:vlink {text-decoration: none; color :000000; font-size: small}
A.head:visited {text-decoration: none;color :009900; font-size: small}
A.head:hover {color: #000099; letter-spacing: 0; text-decoration:underline}

A.phead {text-decoration: none; color: #009900; font-size: medium; font-weight: bold;}
A.psub {text-decoration: none; color: black; font-weight: bold;}
A.pcap {text-decoration: none; color: black; font-style: italic;}
A.pdef {text-decoration: none; color: #aa0055}
A.pdefhov {text-decoration: none; color: #aa0055}

A.pdeflink:link {text-decoration: underline; color : #aa0055}
A.pdeflink:vlink {text-decoration: underline; color :#aa0055}
A.pdeflink:visited {text-decoration: underline; color : #aa0055}
A.pdeflink:hover {color: #dd0088; letter-spacing: 0; text-decoration:underline}

A.alink:link {text-decoration: none; color : #880088}
A.alink:vlink {text-decoration: none; color :#000000}
A.alink:visited {text-decoration: none; color : #880088}
A.alink:hover {color: #cc00cc; letter-spacing: 0; text-decoration:underline}

A.plink:link {text-decoration: none; color : #005588}
A.plink:vlink {text-decoration: none; color :#000000}
A.plink:visited {text-decoration: none; color : #005588}
A.plink:hover {color: #0055ff; letter-spacing: 0; text-decoration:underline}

A.pdflink:link {text-decoration: underline; color : #ffee88}
A.pdflink:vlink {text-decoration: underline; color :#ffee88}
A.pdflink:visited {text-decoration: underline; color : #ffee88}
A.pdflink:hover {color: #ffffaa; letter-spacing: 0; text-decoration:underline}

A.tlink:link {text-decoration: underline; color :black}
A.tlink:vlink {text-decoration: underline; color :#000000}
A.tlink:visited {text-decoration: underline; color :black}
A.tlink:hover {color: black; letter-spacing: 0; text-decoration:underline}

A.tnam {text-decoration: none; color: black; font-size: medium; font-weight: bold;}
A.tres {text-decoration: none; color: #bb4400; font-weight: bold; font-style: italic;}

A.htitle {text-decoration: none; color: #dd0000; font-size: x-large; font-weight: bold; font-family: Times}
A.hhead:link {text-decoration: none; color :#009900; font-size: small}
A.hhead:vlink {text-decoration: none; color :000000; font-size: small}
A.hhead:visited {text-decoration: none;color :#009900; font-size: small}
A.hhead:hover {color: #000099; letter-spacing: 0; text-decoration:underline; font-size: small}

A.malph {text-decoration: none; color :#009900}

A.rnum {text-decoration: none; color: #009900; font-size: medium;}
A.rauth {text-decoration: none; color: #880088; font-size: medium;}
A.rtitle {text-decoration: none; color: #005588}
A.rjour {text-decoration: none; color: black; font-style: italic;}
A.rvol {text-decoration: none; color: black; font-weight: bold;}
A.ryear {text-decoration: none; color: black}
rpage {text-decoration: none; color: black; font-style: italic;}

BODY {font-family: Verdana, sans-serif}

-->

