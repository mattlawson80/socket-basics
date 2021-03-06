var socket = io();
var name = getQueryVariable('name') || 'Anonmyous';
var room = getQueryVariable('room');

// Sets the room name
var $roomTitle = jQuery('.room-title');
$roomTitle.text(room);

socket.on('connect', function () {
	console.log('Conncted to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	var momentTimestamp = moment.utc(message.timestamp);

	
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');

	$messages.append($message);
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

