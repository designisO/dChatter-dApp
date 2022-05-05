/* Moralis init code */
const serverUrl = "https://y1mxcposiuvn.usemoralis.com:2053/server";
const appId = "9ATsgPjQbkVkc8SxVnDgbBALhlFSLNzazCs9CFnk";
Moralis.start({ serverUrl, appId });

/* TODO: Add Moralis Authentication code */

async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate({
        signingMessage: "Welcome to dChatter. Enjoy Chatting!",
      })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  
  async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
  }
  


/* ------------------------------------------------------------------------------ */

async function newGroupChat(){
  let chatTitle = document.getElementById("group-name-text").value;
  const Chats = Moralis.Object.extend("Chats");
  const chat = new Chats();
  chat.set("title", chatTitle);
  chat.save();

  console.log("created chat with title " + chatTitle);
}

async function getGroupChats(){
  const Chats = Moralis.Object.extend("Chats");
  const query = new Moralis.Query(Chats);
  const results = await query.find();

  const roomList = document.getElementById("roomList");

  for (let i = 0; i < results.length; i++) {
    const object = results[i];
    console.log(object.get('title'));
    var listItem = document.createElement('li');
    listItem.innerHTML = "<a href='chat.html?id="+object.id+"'>"+object.get('title')+"</a>";
    roomList.appendChild(listItem);
  }

}



getGroupChats();

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-new-group-chat").onclick = newGroupChat;
