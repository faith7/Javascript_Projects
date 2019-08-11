//variables
const tweetList = document.getElementById("tweet-list");

//event listeners
eventListner();
function eventListner() {
  //form submission
  document.querySelector("#form").addEventListener("submit", newTweet);

  //remove tweet from the list
  tweetList.addEventListener("click", removeTweet);

  //DOM content load
  document.addEventListener("DOMContentLoaded", localStorageOnLoad);
}

// functions
//add new tweets
function newTweet(e) {
  e.preventDefault();

  //read Textarea value
  const tweet = document.getElementById("tweet").value;
  const li = document.createElement("li");
  li.textContent = tweet;
  tweetList.appendChild(li);

  //create remove button when creating an item
  const removeBtn = document.createElement("a");
  removeBtn.classList = "remove-tweet";
  removeBtn.textContent = "X";

  //add remove text to each tweet
  li.appendChild(removeBtn);

  //add tweets to the list
  tweetList.appendChild(li);

  //add local storage
  addTweetLocalStorage(tweet);

  alert("Tweet added!");
  this.reset();
}

//remove tweets from the DOM
function removeTweet(e) {
  if (e.target.classList.contains("remove-tweet")) {
    e.target.parentElement.remove();
  }

  //remove from local storage
  removeLocalStorage(e.target.parentElement.textContent);
}

//add local storage
function addTweetLocalStorage(tweet) {
  let tweets = getTweetFromStorage();

  tweets.push(tweet);
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//get local storage tweets
function getTweetFromStorage() {
  let tweets;
  const tweetsLS = localStorage.getItem("tweets");
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets;
}

//load localstorage items
function localStorageOnLoad() {
  let tweets = getTweetFromStorage();

  tweets.forEach(function(tweet) {
    //create remove button when creating an item
    const removeBtn = document.createElement("a");
    removeBtn.classList = "remove-tweet";
    removeBtn.textContent = "X";

    //add remove text to each tweet
    const li = document.createElement("li");
    li.textContent = tweet;
    li.appendChild(removeBtn);

    //add tweets to the list
    tweetList.appendChild(li);
  });
}

//remove tweets from localstorage
function removeLocalStorage(tweet) {
  let tweets = getTweetFromStorage();
  const tweetDelete = tweet.substring(0, tweet.length - 1);

  //loop through tweets and delete the selected tweet
  tweets.forEach(function(tweetsLS, index) {
    if (tweetDelete == tweetsLS) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
