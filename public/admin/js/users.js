var firebaseConfig = {
    apiKey: "......................",
    authDomain: "......................",
    databaseURL: "......................",
    projectId: "......................",
    storageBucket: ".......................appspot.com",
    messagingSenderId: "......................",
    appId: "1:......................:web:4a4470fed53f34f7ed82de",
    measurementId: "......................"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


var categoryRef = firebase.database().ref('Users');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#user_data').innerHTML += `
        <tr>
            <td>${obj[key].userName}</td>
            <td>${obj[key].userMail}</td>
            <td><button class = "btn btn-danger btn-sm" onclick = "delete_user('${key}')" >Delete</button></td>
        </tr>
        `
    })
} )

function select_user(e){
    firebase.database().ref('Users/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('user_no').value = snapshot.val().name;
    })
}

var selectedId;

function update_user(){
    firebase.database().ref('Users/' + selectedId).update({
        name : document.getElementById('user_no').value
    })
    location.reload();
}

function delete_user(e){
    firebase.database().ref('Users/' + e).remove();
    location.reload()
}