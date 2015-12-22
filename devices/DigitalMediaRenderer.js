var util = require('util'),
    Promise = require('bluebird');
    BaseDeviceProfile = require('./BaseDevice');


function DigitalMediaRenderer(client) {
	
	BaseDevice.call(this);
	this.client = Promise.promisifyAll(client);
 

	this.cast = function(url, options) {
		
		opts = {
		  autoplay: true,
		  contentType: 'video/mp4',
		  metadata: {
		    title: '#ripmatbee',
		    creator: 'SchizoDuckie',
		    type: 'video', // can be 'video', 'audio' or 'image'
		  }
		};

		this.client.loadAsync(url, options);
	};

	this.play = function() {
		return this.client.playAsync();
	};


	this.pause = function() {
		return this.client.pauseAsync();
	};

	this.stop = function() {
		return this.client.stopAsync();
	};

	// Seek to 10 minutes
	//client.seek(10 * 60);

	client.on('status', function(status) {
	  // Reports the full state of the AVTransport service the first time it fires,
	  // then reports diffs. Can be used to maintain a reliable copy of the
	  // service internal state.
	  console.log(status);
	});

	client.on('loading', function() {
	  console.log('------> loading', arguments);
	});

	client.on('playing', function() {
	  console.log('playing');

	  client.getPosition(function(err, position) {
	    console.log(position); // Current position in seconds
	  });

	  client.getDuration(function(err, duration) {
	    console.log(duration); // Media duration in seconds
	  });
	});

	client.on('paused', function() {
	  console.log('paused');
	});

	client.on('stopped', function(args) {
	  console.log('stopped', arguments);
	});

}

module.exports = DigitalMediaRenderer;