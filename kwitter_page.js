var firebaseConfig = {
    apiKey: "AIzaSyDT0opbIK5GkfYrD17WoMl_htbVRm6j3oc",
    authDomain: "kwitter-896d9.firebaseapp.com",
    databaseURL: "https://kwitter-896d9-default-rtdb.firebaseio.com",
    projectId: "kwitter-896d9",
    storageBucket: "kwitter-896d9.appspot.com",
    messagingSenderId: "546162348630",
    appId: "1:546162348630:web:0c02d7fa20926285f361f7"
  };
  
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";

}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) {
     document.getElementById("output").innerHTML = "";
 snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
     childData = childSnapshot.val();
      if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    //name_with_tag = "<h4>"+ name +"<img class='user_tick' src='tick.png'> </h4>";
    //message_with_tag = "<h4 class='message_h4'>"+ message +"</h4>";
    //like_button ="<button class='btn btn-warning' id="+ firebase_message_id+ "value="+ like +" onclick='updateLike(this.id)'>";
    //span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : "+like+"</span></button><hr>";
    //row = " "+ name +" "+ message +"Like: "+ like +"";
    row = "<h4> "+ name +"<img class='user_tick' src='Tick.png' width='20'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
    document.getElementById("output").innerHTML +=row;
 } });  }); }
getData();

function updateLike(message_id) {
    console.log("clicked on the like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);

    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
};

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_Name");
    window.location = "kwitter.html";
}