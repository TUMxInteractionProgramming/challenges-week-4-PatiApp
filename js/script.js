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
