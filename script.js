document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        // INSERT YOUR CONFIG OBJECT BELOW

        // apiKey: "AIzaSyAYgXGtioxkS7dXtvbOup9gI---LEwZuMo",
        // authDomain: "datainputretrieve.firebaseapp.com",
        // databaseURL: "https://datainputretrieve-default-rtdb.firebaseio.com", -- THIS IS SUPER IMPORTANT
        // projectId: "datainputretrieve",
        // storageBucket: "datainputretrieve.appspot.com",
        // messagingSenderId: "667682354747",
        // appId: "1:667682354747:web:bc98c1b57e5e01fde58e1e"
    };

    firebase.initializeApp(firebaseConfig);

    //project form
    let messagesRef = firebase.database().ref('Collected Data');

    document.getElementById('contactForm').addEventListener('submit', submitForm);

    function submitForm(e) {
        e.preventDefault();

        // Get values
        let name = getInputVal('name');
        let email = getInputVal('email');
        let color = getInputVal('color');
        let city = getInputVal('city');

        saveMessage(name, email, color, city);
        document.getElementById('contactForm').reset();
    }

    // Function to get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }

    // Function to save the message to firebase
    function saveMessage(name, email, color, city) {
        let newMessageRef = messagesRef.push();
        newMessageRef.set({
            name: name,
            email: email,
            color: color,
            city: city
        });
    }

    // Function to display data
    function displayData() {
        messagesRef.on('value', function (snapshot) {
            let dataDisplay = document.getElementById('dataDisplay');
            dataDisplay.innerHTML = ''; 
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                dataDisplay.innerHTML +=
                    `<p>Name: ${childData.name}, Email: ${childData.email}, color: ${childData.color}, city: ${childData.city}}</p>`;
            });
        });
    }

    // Call displayData to show data on page load
    displayData();
});