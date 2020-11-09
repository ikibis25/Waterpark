<?php
if(isset($_POST) && !empty($_POST)){
	$first_name = (isset($_POST['first_name']))?$_POST['first_name']:'';
	$last_name = (isset($_POST['last_name']))?$_POST['last_name']:'';
	$email = (isset($_POST['email']))?$_POST['email']:'';
	$message = (isset($_POST['message']))?$_POST['message']:'';
	$subject = (isset($_POST['subject']))?$_POST['subject']:'';
	
	$sendMessage = $mailSubject = '';
	if($_POST['form_type'] == 'contact'){
		$mailSubject = 'Contact Details';
		$sendMessage = "<p>Hello,</p><p>".$first_name. $last_name." has sent a message having </p><p><b>Subject:</b> ".$subject."</p><p><b>Email id:</b> ".$email."</p><p><b>Query is:</b> ".$message."</p>";
	}elseif($_POST['form_type'] == 'inquiry'){
		$mailSubject = 'Inquiry Details';
		$sendMessage = '';
	}
	
	if($sendMessage != ''){
		$fromEmail = 'support@water.park.com';
		$toEmail = 'rahul.thakur@himanshusofttech.com';
		
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= "From: <$fromEmail>" . "\r\n";

		if(mail($toEmail , $mailSubject , $sendMessage , $headers )){
			echo 1;
		}else{
			echo 0;
		}
	}else{
		echo 0;
	}
}else{
	echo 0;
}

?>