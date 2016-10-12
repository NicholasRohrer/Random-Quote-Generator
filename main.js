// runs qetQuote as soon as page loads
$(document).ready(getQuote);

//cache the DOM
var $theQuote = $('#quote');
var $theAuthor = $('#author');
var $theQuoteButton = $('#newQuoteButton');
var $theTweetButton = $('#tweet-button');

// quote to tweet
var quoteToTweet = "";
var fullQuote = "";

// grabs info from quote API
function getQuote() {
	$.getJSON('https://random-quote-generator.herokuapp.com/api/quotes/random', writeQuote);
}

// populates new quote and author content
function writeQuote(json) {
	$theQuote.hide().text("\""+json.quote+"\"").fadeIn();
	$theAuthor.hide().text(json.author).fadeIn();
}

// opens a new page and populates tweet with current quote and author
function tweetQuote() {
	fullQuote = $theQuote.text() + " - " + $theAuthor.text();
	
	// check for tweet length over 140 characters
	if (fullQuote.length > 140) {
		fullQuote = truncateString(fullQuote, 140);
	}
	
	quoteToTweet = encodeURIComponent(fullQuote);
	window.open("https://twitter.com/intent/tweet?text=" + quoteToTweet, "_blank");
}

// truncate string for 140 character tweet length
function truncateString(str, num) {
	var newStr; 
	newStr = str.slice(0, num - 3);
	return newStr + "...";
}

// change the quote and author when button is clicked
$theQuoteButton.on("click", getQuote);
// open new page and tweet the quote
$theTweetButton.on("click", tweetQuote);