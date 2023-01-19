var firebaseConfig = {
    apiKey: "......................",
    authDomain: "......................",
    databaseURL: "......................",
    projectId: "......................",
    storageBucket: ".......................appspot.com",
    messagingSenderId: "......................",
    appId: "......................",
    measurementId: "......................"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// function add_category(){
//     var id = document.getElementById('item_id').value;
//     var name = document.getElementById('item_name').value;
//     var price = document.getElementById('item_price').value;

//     var postListRef = firebase.database().ref('Allparts');
//     var newPostRef = postListRef.push();
//     newPostRef.set({
//         id : id,
//         name : name,
//         price : price
//     });
//     location.reload();
// }

var categoryRef = firebase.database().ref('Allparts');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#items_data').innerHTML += `
        <tr>
            <th scope="row">${key}</th>
            <td>${obj[key].name}</td>
            <td>${obj[key].price}</td>
            <td><button class = "btn btn-primary btn-sm" onclick = "select_category('${key}')" >Select</button></td>
            <td><button class = "btn btn-danger btn-sm" onclick = "delete_category('${key}')" >Delete</button></td>
        </tr>
        `
    })
} )

function select_category(e){
    firebase.database().ref('Allparts/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('item_name').value = snapshot.val().name;
        document.getElementById('item_price').value = snapshot.val().price;
    })
}

var selectedId;

function update_category(){
    firebase.database().ref('Allparts/' + selectedId).update({
        name : document.getElementById('item_name').value,
        price : document.getElementById('item_price').value
    })
    location.reload();
}

function delete_category(e){
    firebase.database().ref('Allparts/' + e).remove();
    location.reload()
}