/*jslint white:false plusplus:false nomen:false */
/*globals $, io */

var socket = io.connect();

function simple_html_escape(s)
{
	return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function appendMsg(msg) {
	$('#msgs').append(function() {
		var div = $('<div>');
		div.html('<b>' + simple_html_escape(msg.username) + ':</b> ' + simple_html_escape(msg.message));
		return div;
	});
	$('#msgs')[0].scrollTop = $('#msgs')[0].scrollHeight;
}

socket.on('msg', function(data) {
	var msg = JSON.parse(data);
	appendMsg(msg);
});

socket.on('init', function(data) {
	var messages = JSON.parse(data);
	$.each(messages, function(index,message) {
		appendMsg(message);
	});
});

function sendMsg() {
	var msg = {};
	$.each($('#chat').serializeArray(), function(i,v) {
		msg[v.name] = v.value;
	});
	$("#msg").val("");
	appendMsg(msg);
	socket.emit('msg', JSON.stringify(msg));
}
