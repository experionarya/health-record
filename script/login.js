



function load() {

	var httpObj = new XMLHttpRequest();
	httpObj.onreadystatechange = function() {
		
		if(this.readyState == 4 && this.status == 200) {

			var result=this.responseText;
			result=JSON.parse(result);
			console.log(result.type);
			localStorage.setItem('type',result.type);

			if(result.type == "admin") {
			 	
			 	localStorage.setItem('token',result.token);
				localStorage.setItem('userid',result.user_id);
				alert("login successfull");
				window.location="admin_user.html";
			}

			else if(result.type == "user") {
				
				localStorage.setItem('token',result.token);
				localStorage.setItem('userid',result.user_id);
				alert("login successfull");
				window.location = "user_home.html";
			}
			
			else {
					
					alert("login failed");
				}
		}

		if(this.status == 403) {
			alert("invalid entry");
		}
	};

	var p_word = escape(document.getElementById("password").value);
	var password = (Crypto.MD5(p_word)).toString();
	
	httpObj.open('POST','http://192.168.1.229:8081/login',true);
	httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
	httpObj.send('username='+escape(document.getElementById("username").value)+'&password='+password);
}


function validate() {

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	 
	if(username ==''&& password =='') {
		alert("Enter your username and password");
	}

	else if(username =='') {
		alert("Enter your username");
	}

	else if(password =='') {
		alert("Enter your password");
	}

	else {
		load();
	}

}







