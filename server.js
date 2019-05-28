const mongoose = require('mongoose');
const app = require('./src/app');

// freeCodeCamp testing stuff
const fccTestingRoutes = require('./fcctesting.js');
const runner = require('./test-runner');
fccTestingRoutes(app);

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT || 3000, function() {
	console.log('Listening on port ' + process.env.PORT);
	if (process.env.NODE_ENV === 'test') {
		console.log('Running Tests...');
		setTimeout(function() {
			try {
				runner.run();
			} catch (e) {
				var error = e;
				console.log('Tests are not valid:');
				console.log(error);
			}
		}, 3500);
	}
});
