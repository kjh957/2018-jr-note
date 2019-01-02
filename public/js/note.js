// Initialize Firebase
var config = {
    apiKey: "AIzaSyCFkwmuScUrW-o3AYZMlOHZDFm3MTVdRKg",
    authDomain: "wlsgh957-note.firebaseapp.com",
    databaseURL: "https://wlsgh957-note.firebaseio.com",
    projectId: "wlsgh957-note",
    storageBucket: "wlsgh957-note.appspot.com",
    messagingSenderId: "1041784064799"
  };

firebase.initializeApp(config);

var db = firebase.database();
var ref = null;
var auth = firebase.auth();
var google = new firebase.auth.GoogleAuthProvider();
var user = null;
var ta = $("#content");

//데이터베이스 구현
$("#bt_add").click(function(){
	
});
$("#bt_save").click(function(){
	var content = ta.val();
	if(content == '') {
		alert("내용을 입력하세요.");
		ta.focus();
	}
	else {
		ref = db.ref("root/note/"+user.uid);
		ref.push({
			content: content,
			saveTime: new Date().getTime()
		}).key;
	}
});
$("#bt_cancel").click(function(){
	ta.val('');
});

//인증구현
$("#bt_google_login").click(function(){
	auth.signInWithPopup(google);
	//auth.signInWithRedirect(google);
});
$("#bt_google_logout").click(function(){
	auth.signOut();
});
auth.onAuthStateChanged(function(data){
	if(data) {
		//signIn 상태
		user = data;
		$("#bt_google_login").hide();
		$("#bt_google_logout").show();
		$(".email").html(user.email);
		$(".symbol").show();
		$(".symbol > img").attr("src", user.photoURL);
	}
	else {
		//signOut 상태
		user = null;
		$("#bt_google_login").show();
		$("#bt_google_logout").hide();
		$(".email").html("");
		$(".symbol").hide();
		$(".symbol > img").attr("src", "");
	}
});





// 옛스러운 방식
/*
$("#bt_google_login").on("click", function(){
	auth.signInWithPopup(google).then(function(data){
		$("#bt_google_login").hide();
		$("#bt_google_logout").show();
		user = data.user;
		$(".email").html(user.email);
		$(".symbol").show();
		$(".symbol > img").attr("src", user.photoURL);
	});
});
$("#bt_google_logout").on("click", function(){
	auth.signOut().then(function(data){
		$(this).hide();
		$("#bt_google_login").show();
		$("#bt_google_logout").hide();
		user = null;
		$(".email").html("");
		$(".symbol").hide();
		$(".symbol > img").attr("src", "");
	});
});
*/
