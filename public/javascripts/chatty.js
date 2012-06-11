/*jslint white:false plusplus:false nomen:false */
/*globals $, io, window, document */

var socket = io.connect();

function simple_html_escape(s)
{
	return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function appendMsg(msg) {
	$('#msgs').append(function() {
		var div, html;
		div = $('<div>');
		html = '<div class="bubble-content">' +
					simple_html_escape(msg.message) +
				'</div>\r\n' +
				'<div class="quote-tail"></div>\r\n' +
					'<div class="quote-tail2"></div>\r\n' +
					'<div class="whom">' +
						simple_html_escape(msg.username) +
					'</div>\r\n' +
				'</div>\r\n';
		div.html(html);
		return div;
	});
	//$('#msgs')[0].scrollTop = $('#msgs')[0].scrollHeight;
	window.scrollTo(0, document.body.scrollHeight);
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

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function sendMsg() {
	var msg = {};
	$.each($('#chat').serializeArray(), function(i,v) {
		msg[v.name] = trim(v.value);
	});
	if ( msg.message.length && msg.username.length )
	{
		$("#msg").val("");
		appendMsg(msg);
		socket.emit('msg', JSON.stringify(msg));
	}
}
