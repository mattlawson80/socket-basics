var socket = io();
var name = getQueryVariable('name') || 'Anonmyous';
var room = getQueryVariable('room');

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);

	var momentTimestamp = moment.utc(message.timestamp);

	var $message = jQuery('.messages');
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});