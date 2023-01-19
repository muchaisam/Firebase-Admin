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

var categoryRef = firebase.database().ref('Cart').child('UNIQUE_USER_ID');
categoryRef.once("value", (snapshot) => {
    var obj = snapshot.val();
    Object.keys(obj).forEach((key) =>{
        console.log(key);
        document.querySelector('#items_data').innerHTML += `
        <tr>
            <th scope="row">${key}</th>
            <td>${obj[key].name}</td>
            <td>${obj[key].quantity}</td>
            <td>${obj[key].totalprice}</td>
        </tr>
        `
    })
} )

function select_category(e){
    firebase.database().ref('Cart/' + e).once("value", (snapshot) => {
        selectedId = e;
        document.getElementById('item_name').value = snapshot.val().name;
        document.getElementById('item_price').value = snapshot.val().price;
    })
}

var selectedId;

function update_category(){
    firebase.database().ref('Cart/' + selectedId).update({
        name : document.getElementById('item_name').value,
        price : document.getElementById('item_price').value
    })
    location.reload();
}

function delete_category(e){
    firebase.database().ref('Cart/' + e).remove();
    location.reload()
}