console.log("App is alive");



var currentChannel;
currentChannel = sevencontinents;
var currentLocation = {
    latitude: 48.262408,
    longitude: 11.666553,
    what3words: "spilled.spells.odds"
};
/**
 * #6 #Switcher function for the #channels name in the right app bar
 * @param channelObject Text which is set
 */

function switchChannel(channelObject) {
    //Log the channel switch
    console.log("Tuning in to channel", channelObject.name);

    //Write the new channel to the right app bar
    document.getElementById('channel-name').innerHTML = channelObject.name;

    //#6 change the #channel #location
    document.getElementById('channel-location').innerHTML = 'by <a href="http://w3w.co/'
        + channelObject.createdBy
        + '" target="_blank"><strong>'
        + channelObject.createdBy
        + '</strong></a>';

    $('#chat h1 i').removeClass('far fas');

    $('#chat h1 i').addClass(channelObject.starred ? 'fas' : 'far');

    /* #6 #highlight the selected #channel.*/
    $('#channels li').removeClass('selected');
    $('#channels li:contains(' + channelObject.name + ')').addClass('selected');
    currentChannel = channelObject;
}

/* #6 #liking a channel on #click */
function star() {
    $('#chat h1 i').toggleClass('fas');
    $('#chat h1 i').toggleClass('far');

    currentChannel.starred = !currentChannel.starred;

    $('#channels li:contains(' + currentChannel.name + ') .fa-star').removeClass('fas far');
    $('#channels li:contains(' + currentChannel.name + ') .fa-star').addClass(currentChannel.starred ? 'fas' : 'far');
}

/**
 * #6 #taptab selects the given tab
 * @param tabId #id of the tab
 */
function selectTab(tabId) {
    // #6 #taptab #remove selection from all buttons...
    $('#tab-bar button').removeClass('selected');

    //...#6 #taptab #log the new tab on change...
    console.log('Changing to tab', tabId);

    //...#6 #taptab #add selection to the given tab button, its id is passed via the #argument tabId
    $(tabId).addClass('selected');
}

/**
 * #6 #toggle (show/hide) the emojis menu #smile
 */
function toggleEmojis() {
    /* $('#emojis').show(); // #show */
    $('#emojis').toggle(); // #toggle
}






/** for This
 * @param text `String`
 * @constructor
 */

function Message(text) {

    this.createdBy = currentLocation.what3words;
    this.latitude = currentLocation.latitude;
    this.longitude = currentLocation.longitude;
    this.createdOn = new Date(Date.now())
    this.expiresOn = new Date(Date.now() + 15 * 60 * 1000);
    this.text = text;
    this.own = true;
}

function sendMessage() {
    //  var message = new Message("Hello Chatter");

    var message = new Message($('#message').val());
    console.log("New message:", message.text);

    $('#messages').append(createMessageElement(message));

    $('#messages').scrollTop($('#messages').prop('scrollHeight'));

    $('#message').val('');
}

/**
 * 
 * @param messageObject 
 * @returns
 */
function createMessageElement(messageObject) {

    var expiresIn = Math.round((messageObject.expiresOn - Date.now()) / 1000 / 60);

    return '<div class="message'+

        (messageObject.own ? ' own' : '') +
        '">' +
        '<h3><a href="http://w3w.co/' + messageObject.createdBy + '" target="_blank">'+
        '<strong>' + messageObject.createdBy + '</strong></a>' +
        messageObject.createdOn.toLocaleString() +
        '<em>' + expiresIn+ ' min. left</em></h3>' +
        '<p>' + messageObject.text + '</p>' +
        '<button>+5 min.</button>' +
        '</div>';
}


function listChannels() {
    $('#channels ul').append("<li>New Channel</li>")
    $('#channels ul').append(createChannelElement(yummy));
    $('#channels ul').append(createChannelElement(sevencontinents));
    $('#channels ul').append(createChannelElement(killerapp));
    $('#channels ul').append(createChannelElement(firstpersononmars));
    $('#channels ul').append(createChannelElement(octoberfest));
}

/**
 * 
 * @param channelObject
 * @returns {HTMLElement}
 */
function createChannelElement(channelObject) {

    //  <li>
    //  {{ name }}
    //     <span class="channel-meta">
    //         <i class="far fa-star"></i>
    //         <i class="fas fa-chevron-right"></i>
    //     </span>
    //  </li>


    var channel = $('<li>').text(channelObject.name);
    var meta = 
    $('<span>').addClass('channel-meta').appendTo(channel);
    $('<i>').addClass('fa-star').addClass(channelObject.starred ? 'fas' : 'far').appendTo(meta);

    $('<span>').text(channelObject.expiresIn + ' min').appendTo(meta);
    $('<span>').text(channelObject.messageCount + ' new').appendTo(meta);

    $('<i>').addClass('fas').addClass('fa-chevron-right').appendTo(meta);

    return channel;
}