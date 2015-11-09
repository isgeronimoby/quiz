<?
require("class.phpmailer.php");

$mail = new PHPMailer();

$imageUrl = "http://[YOUR-DOMAIN]/images/";

$mail->IsSMTP();                                   // send via SMTP
$mail->Host     = "mail.[YOUR-DOMAIN].com"; // SMTP servers
$mail->SMTPAuth = true;     // turn on SMTP authentication
$mail->Username = "[YOUR-MAIL-ADDRESS]";  // SMTP username
$mail->Password = "[YOUR-MAIL-PASSWORD]"; // SMTP password

$mail->ContentType = "text/html";
$mail->CharSet = "windows-1254\r\n";

$mail->From     = "[YOUR-MAIL-ADDRESS]";
$mail->Fromname = $_POST['name'];
$mail->AddAddress($_POST['email'] , "aa");
$mail->Subject  =  "Happy New Year";
$mail->Body     =  "<html xmlns=\"http://www.w3.org/1999/xhtml\">
<head>
    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
    <meta property=\"og:title\" content=\"NOELLE\" />
    <title>Happy New Year!</title>
    <style type=\"text/css\">
        #outlook a { padding:0; }
        body { width:100% !important; }
        .ReadMsgBody { width:100%; }
        .ExternalClass { width:100%; }
		.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
        body { -webkit-text-size-adjust:none; font-size:12px; font-family:Arial; }
        body { margin:0; padding:0; }
        img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
        table, table td { border-collapse:collapse; }
        body, #backgroundTable { background-color:#e01c04; }
		#backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;}
        a:link, a:visited, a .yshortcuts { color:#eb6402; font-weight:bold; text-decoration:underline; }
    </style>
</head>
<body leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" style=\"background-color:#e01c04; padding:0px 0px 50px 0px;\" offset=\"0\">
    <center style=\"background-color:#e01c04; padding:0 0 50px 0;\">
        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\"  style=\"height:100% !important; background-color:#e01c04; margin:0; padding-top:0px; padding-bottom:50px; padding-left:20px; padding-right:20px; width:100% !important;-webkit-text-size-adjust:none; font-size:12px; font-family:Arial;\">
            <tr>
            <td align=\"center\" valign=\"top\">
			<table  border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"450\" style=\"width:450px;\">
			<tr>
				<td width=\"450\" height=\"220\" valign=\"top\" align=\"left\" style=\"line-height:0;\">
                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"220\" style=\"border:none; line-height:0; \">
                        <tr>
                            <td width=\"450\" height=\"220\" align=\"center\" valign=\"top\" style=\"line-height:0; \">
                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"220\" style=\"line-height:0;\">
                                    <tr>
                                        <td width=\"450\" height=\"137\" align=\"left\" valign=\"bottom\" style=\"line-height:0;\">
                                            <table bgcolor=\"#fff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"137\" width=\"450\" style=\"border:none; background-color:#fff; color:#6d6e71; width:450px; height:137px; line-height:0;\" >
											<tr>
												<td width=\"450\" height=\"137\" align=\"left\" valign=\"top\" style=\"line-height:0;width:450px; height:137px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."01.jpg\" alt=\"\" width=\"450\" height=\"137\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
											</tr>
										</table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width=\"450\" height=\"83\" align=\"left\" valign=\"top\" style=\"line-height:0;\">
                                            <table bgcolor=\"#fff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"83\" width=\"450\" style=\"border:none; background-color:#fff; color:#6d6e71; width:450px; height:83px; line-height:0;\" >
											<tr>
												<td width=\"450\" height=\"83\" align=\"left\" valign=\"top\" style=\"line-height:0;width:450px; height:83px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."02.jpg\" alt=\"\" width=\"450\" height=\"83\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
											</tr>
										</table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
       		  </td>
			</tr>
			<tr>
				<td width=\"450\" height=\"146\" valign=\"top\" align=\"left\" style=\"line-height:0;\">
                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"146\" style=\"border:none; line-height:0; \">
                        <tr>
                            <td width=\"450\" height=\"146\" align=\"center\" valign=\"top\" style=\"line-height:0; \">
                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"146\" style=\"line-height:0;\">
                                    <tr>
                                        <td width=\"450\" height=\"146\" align=\"left\" valign=\"bottom\" style=\"line-height:0;\">
                                            <table bgcolor=\"#fff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"146\" width=\"450\" style=\"border:none; background-color:#fff; color:#6d6e71; width:450px; height:146px; line-height:0;\" >
											<tr>
												<td width=\"110\" height=\"146\" align=\"left\" valign=\"top\" style=\"line-height:0;width:110px; height:146px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."03.jpg\" alt=\"\" width=\"110\" height=\"146\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
												<td width=\"230\" height=\"146\" align=\"left\" valign=\"top\" style=\"line-height:14px; width:230px; height:146px !important; text-align:center; padding-top: 0; padding-left: 0; padding-bottom: 0; padding-right: 0;\">
                                                        <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"230\" height=\"146\" style=\" width:230px; height:146px; background-color:#fff; padding-bottom:0px;\">
														    <tr>
															    <td valign=\"top\" colspan=\"5\" style=\"line-height:14px; width:230px; text-align:center; font-size:12px; color:#000;\">". $_POST['message']. "</td>
														    </tr>
															<tr>
															    <td valign=\"top\" colspan=\"5\" style=\" line-height:14px; width:230px; height:30px !important; text-align:center; font-size:12px; color:#000;\"><strong>". $_POST['name']. "</strong></td>
														    </tr>
                                                        </table>
                                                </td>
                                                <td width=\"110\" height=\"146\" align=\"left\" valign=\"top\" style=\"line-height:0; width:110px; height:146px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."04.jpg\" alt=\"\" width=\"110\" height=\"146\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
											</tr>
										</table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
       		  </td>
			</tr>
            <tr>
				<td width=\"450\" height=\"284\" valign=\"top\" align=\"left\" style=\"line-height:0;\">
                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"284\" style=\"border:none; line-height:0; \">
                        <tr>
                            <td width=\"450\" height=\"284\" align=\"center\" valign=\"top\" style=\"line-height:0; \">
                                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"450\" height=\"284\" style=\"line-height:0;\">
                                    <tr>
                                        <td width=\"450\" height=\"76\" align=\"left\" valign=\"bottom\" style=\"line-height:0;\">
                                            <table bgcolor=\"#fff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"76\" width=\"450\" style=\"border:none; background-color:#fff; color:#6d6e71; width:450px; height:76px; line-height:0;\" >
											<tr>
												<td width=\"450\" height=\"76\" align=\"left\" valign=\"top\" style=\"line-height:0;width:450px; height:76px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."05.jpg\" alt=\"\" width=\"450\" height=\"76\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
											</tr>
										</table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width=\"450\" height=\"208\" align=\"left\" valign=\"top\" style=\"line-height:0;\">
                                            <table bgcolor=\"#fff\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"208\" width=\"450\" style=\"border:none; background-color:#fff; color:#6d6e71; width:450px; height:208px; line-height:0;\" >
											<tr>
												<td width=\"450\" height=\"208\" align=\"left\" valign=\"top\" style=\"line-height:0; width:450px; height:208px !important; text-align:left; outline:none;\"><img src=\"".$imageUrl."06.jpg\" alt=\"\" width=\"450\" height=\"208\" hspace=\"0\" vspace=\"0\" align=\"left\" style=\"display:block\" />
                                                </td>
											</tr>
										</table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
       		  </td>
			</tr>
			</table>
            </tr>
        </table>
    </center>
</body>
</html>";

if(!$mail->Send())
{
   echo "Mesaj Gönderildi <p>";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "Mail send";


?>
