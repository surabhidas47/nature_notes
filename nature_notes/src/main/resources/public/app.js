const API_URL = `http://localhost:8080`
//const API_URL = `http://127.0.0.1:8080/`



function fetchTicketsData() {
//1.making a GET request
    fetch(`${API_URL}/api/entries`)
        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
           //2.returning the request in JSON
            return res.json();
        })
        .then((data) => {
        //3.calling this function to display the list
            showTicketList(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Tickets Data'
        })
}


//1.getting specific entry, if succesfull calls 2.
function fetchTicket(id) {

    fetch(`${API_URL}/api/entries/${id}`)

        .then((res) => {
            //console.log("res is ", Object.prototype.toString.call(res));
            return res.json();
        })
        .then((data) => {
        //2.shows the specfic entry
            showTicketDetail(data)
        })
        .catch((error) => {
            console.log(`Error Fetching data : ${error}`)
            document.getElementById('posts').innerHTML = 'Error Loading Entry Data'
        })
}

//
function parseTicketId() {
    try {
        var url_string = (window.location.href).toLowerCase();
        var url = new URL(url_string);
        var ticketid = url.searchParams.get("ticketid");
        // var geo = url.searchParams.get("geo");
        // var size = url.searchParams.get("size");
        // console.log(name+ " and "+geo+ " and "+size);
        return ticketid
      } catch (err) {
        console.log("Issues with Parsing URL Parameter's - " + err);
        return "0"
      }
}
// takes a UNIX integer date, and produces a prettier human string
//function dateOf(date) {
//    const milliseconds = date * 1000 // 1575909015000
//    const dateObject = new Date(milliseconds)
//    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
//    return humanDateFormat
//}

//1.taking array of ticket entry data as input and generating html elements
function showTicketList(data) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.

    //2.so in entries.html we are getting <div id='posts'></div> with this doc.getElement
    const ul = document.getElementById('posts');

    //3. basically when we create a document fragment we are about to creates nodes
    const list = document.createDocumentFragment();

    //4.map an input to different output.. post is one json object, we are mapping it ..
    //for each json object we are create list, titlt.... and then doing it for the next one

    data.map(function(post) {
        console.log("Entry:", post);

        //5. i am creating nodes! (part of the dom tree)
        let li = document.createElement('li');
        let title = document.createElement('h3');

        let body = document.createElement('p');
        //let img = document.createElement('img');


        title.innerHTML = `<a href="/ticketdetail.html?ticketid=${post.id}">${post.tripTitle}</a>`;

        body.innerHTML = `${post.tripDescription}`;

        //img.src = `data:image/png;base64,${post.tripPhoto}`;

        li.appendChild(title);
        li.appendChild(body);
        //li.appendChild(img);


        list.appendChild(li);

    });

    ul.appendChild(list);
}

function showTicketDetail(post) {
    // the data parameter will be a JS array of JS objects
    // this uses a combination of "HTML building" DOM methods (the document createElements) and
    // simple string interpolation (see the 'a' tag on title)
    // both are valid ways of building the html.
    const ul = document.getElementById('post');
    const detail = document.createDocumentFragment();

    console.log("Ticket:", post);
    let li = document.createElement('div');
    let title = document.createElement('h2');
    let body = document.createElement('p');
    let by = document.createElement('p');

    let img = document.createElement('img');
    title.innerHTML = `${post.tripTitle}`;
    body.innerHTML = `${post.tripDescription}`;



    img.src = `data:image/png;base64,${post.tripPhoto}`;

    //let postedTime = dateOf(post.time)
    //by.innerHTML = `${post.date} - ${post.reportedBy}`;


    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(img);
    li.appendChild(by);
    detail.appendChild(li);



    ul.appendChild(detail);
}

function handlePages() {
    let ticketid = parseTicketId()
    console.log("ticketId: ",ticketid)

    if (ticketid != null) {
        console.log("found a ticketId")
        fetchTicket(ticketid)
    } else {
        console.log("load all tickets")
        fetchTicketsData()
    }
}

handlePages()
