var socket = io();

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);

	var momentTimestamp = moment.utc(message.timestamp);


	jQuery('.messages').append('<p><strong>' + momentTimestamp.local().format('h:mm a') + ':</strong> ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});