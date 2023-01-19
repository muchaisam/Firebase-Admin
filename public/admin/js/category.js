var firebaseConfig = {
    apiKey: "..............",
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

function add_category(){
    var id = document.getElementById('category_id').value;
    var name = document.getElementById('category_name').value;

    var postListRef = firebase.database().ref('categories');
    var newPostRef = postListRef.push();
    newPostRef.set({
        id : id,
        name : name
    });
    location.reload();
}

var categoryRef = firebase.database().ref('categories');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#category_data').innerHTML += `
        <tr>
            <th scope="row">${obj[key].id}</th>
            <td>${obj[key].name}</td>
            <td><button class = "btn btn-primary btn-sm" onclick = "select_category('${key}')" >Select</button></td>
            <td><button class = "btn btn-danger btn-sm" onclick = "delete_category('${key}')" >Delete</button></td>
        </tr>
        `
    })
} )

function select_category(e){
    firebase.database().ref('categories/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('category_id').value = snapshot.val().id;
        document.getElementById('category_name').value = snapshot.val().name;
    })
}

var selectedId;

function update_category(){
    firebase.database().ref('categories/' + selectedId).update({
        id : document.getElementById('category_id').value,
        name : document.getElementById('category_name').value
    })
    location.reload();
}

function delete_category(e){
    firebase.database().ref('categories/' + e).remove();
    location.reload()
}