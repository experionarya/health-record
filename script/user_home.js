
var get_token = localStorage.getItem('token');
var get_id = localStorage.getItem('userid');
var get_type = localStorage.getItem('type');

var key = {
             'token':get_token,
             'userid':get_id,
          };

key = JSON.stringify(key);

if(get_token == null || get_id == null || get_type == 'admin') {
  window.location="index.html";
}

$(document).ready(function(){
    $("#p2").click(function(){
    	
        $("#div5").show();
    });
   
});

var httpObj = new  XMLHttpRequest();
httpObj.onreadystatechange = function() {
  
  if(this.readyState == 4 && this.status == 200) {
        var result = this.responseText;
        result = JSON.parse(result);
        document.getElementById("fetch_name").innerHTML = result[0].name;
        document.getElementById("p1").innerHTML = "WELCOME       "+result[0].name;
    
    } 
}

httpObj.open('POST','http://192.168.1.229:8081/fetch_name/'+key,true);
httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
httpObj.send('id='+get_id);

 
function user_insertion() {

  var httpObj = new	XMLHttpRequest();
  httpObj.onreadystatechange = function() {

  	if(this.readyState == 4 && this.status == 200) {
          var result=this.responseText;
          result=JSON.parse(result);
          alert("details added successfully");
          window.location="user_home.html"
  		    console.log("inserted successfully");
  	   }	
  }

  var address = document.getElementById("address").value;
  var dob = document.getElementById("dob").value;
  var bg = document.getElementById("bg").value;
  var date = document.getElementById("date").value;
  var height = document.getElementById("height").value;
  var hid = document.getElementById("hid").value;
  var weight = document.getElementById("weight").value;
  var wid = document.getElementById("wid").value;
  var p_word = document.getElementById("p_word").value;
  
  if(p_word!="") {
    var p_word = (Crypto.MD5(p_word)).toString();
    reset_password(p_word);
  }

  var height = height+''+hid;
  var weight = weight+''+wid;

  httpObj.open('POST','http://192.168.1.229:8081/insert_user/'+key,true);
  httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj.send('id1='+get_id+'&address1='+address+'&dob1='+dob+'&bg1='+encodeURIComponent(bg)+'&date='+date+'&height1='+height+'&weight1='+weight);
}

function validate_user_entry() {

  var address = document.getElementById("address").value;
  var dob = document.getElementById("dob").value;
  var bg = document.getElementById("bg").value;
  var date = document.getElementById("date").value;
  var height = document.getElementById("height").value;
  var hid = document.getElementById("hid").value;
  var weight = document.getElementById("weight").value;
  var wid = document.getElementById("wid").value;
  var p_word = document.getElementById("p_word").value;

    if(address =="" && dob =="" && bg =="" && p_word =="" &&  date =="" && height =="" && hid =="" && weight =="" && wid =="") {
      alert("Enter essential credential");
      return false;
    }

    else if(address =="" ) {
      alert("Enter a valid address");
      return false;
    }

    else if(dob =="") {
        alert("Not a valid dob");
        return false;
    }

    else if(bg =="" ){
      alert("Enter a valid blood group");
      return false;
    }

    else if(date =="" ) {
        alert("Select the date");
        return false;
    }

    else if(weight =="" || isNaN(weight)) {
      alert("Enter a valid weight");
      return false;
    }
    
    else if(height =="" || isNaN(height)) {
      alert("Enter a valid height");
      return false;
    }

    else {
          user_insertion();
    }
}

function reset_password(p_word) {

  var httpObj = new XMLHttpRequest();
  httpObj.onreadystatechange = function() {

    if(this.readyState == 4 && this.status == 200) {
          var result = this.responseText;
          result = JSON.parse(result);
          
       }  
  }

  httpObj.open('PUT','http://192.168.1.229:8081/reset_password/'+key,true);
  httpObj.setRequestHeader('content-type','application/x-www-form-urlencoded');
  httpObj.send('id1='+get_id+'&p_word='+p_word);

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

