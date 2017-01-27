
var get_token = localStorage.getItem('token');
var get_id = localStorage.getItem('userid');
var get_type = localStorage.getItem('type');

var key = {
             'token':get_token,
             'userid':get_id,
          };

key = JSON.stringify(key);

if(get_token == null || get_id == null || get_type == 'user') {
  window.location = "index.html";
}



$(document).ready(function(){
    $("#p1").click(function(){
    	
    	$("#div6").hide();
      $("#div5").show();
        $("#div4").show();
    });
   
    $("#p3").click(function() {
    	$("#div6").hide();
        $("#div5").show();
        
    });
     $("#p4").click(function(){
    	$("#div5").hide();
        $("#div6").show();
       
    });
});


function validate_adduser() {

	var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
	var age = document.getElementById("age").value;
	var gender = document.getElementById('m1').checked?document.getElementById('m1').value:document.getElementById('m2').value;
	var location = document.getElementById("location").value;
	var num = document.getElementById("num").value;
	var matching = email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);

    if(name =="" && matching == "" &&age =="" && location =="" &&  num =="") {
  	alert("Enter essential credential");
    	return false;
   	}

    else if(name =="" || !isNaN(name)) {
      alert("Enter a valid name");
      return false;
    }

    else if(matching =="") {
        alert("Not a valid email");
        return false;
    }

    else if(age =="" || isNaN(age) || !( age >= 1 && age<100 ) ) {
    	alert("Enter a valid age");
    	return false;
    }

    else if(gender =="" ) {
        alert("Select the gender");
        return false;
    }

    else if(location =="" ||!isNaN(location)) {
    	alert("Enter a valid location");
    	return false;
    }

    else if(num =="" ||isNaN(num) || !(num.length>=10 && num.length<13)) {
    	alert("Enter a valid contact number");
    	return false;
    }

    else {
    	load_user();
    }
}



function load_user() {

    var httpObj = new XMLHttpRequest();

    httpObj.onreadystatechange = function() {
    	
    	if(this.readyState == 4 && this.status == 200) {

    		console.log("inserted successfully");
	        alert("added successfully");
	        window.location = "admin_user.html";
    	}	
    }

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var location = document.getElementById("location").value;
    var num = document.getElementById("num").value;
    var gender = document.getElementById('m1').checked?document.getElementById('m1').value:document.getElementById('m2').value;
   
    httpObj.open('POST','http://192.168.1.229:8081/insert/'+key,true);
    httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
    httpObj.send('name1='+name+'&email1='+email+'&age1='+age+'&gender1='+gender+'&location1='+location+'&num1='+num);
   
}


function log_out() {

    if(confirm("Are you sure you want to logout?")) {
       
       localStorage.clear();
       window.location = "index.html";
       return true;
    }

    else {
      return false;
    }

}