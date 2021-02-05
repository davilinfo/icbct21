const {
	Application,
	configDevnet,
	genesisBlockDevnet,
	HTTPAPIPlugin,
	utils,
} = require('lisk-sdk');

const { RestaurantModule } = require('./modules/RestaurantModule');

genesisBlockDevnet.header.timestamp = 1605699440;
genesisBlockDevnet.header.asset.accounts = genesisBlockDevnet.header.asset.accounts.map(
	(a) =>
		utils.objects.mergeDeep({}, a, {
			restaurant: {
				foodRequests: [],
			},
		}),
);

// 4.Update application config to include unique label
// and communityIdentifier to mitigate transaction replay
const appConfig = utils.objects.mergeDeep({}, configDevnet, {
	label: 'restaurants-app',
	genesisConfig: { communityIdentifier: 'Restaurant' }, //In order to have a unique networkIdentifier
	logger: {
		consoleLogLevel: 'info',
	},
	network: {
		port: 5010
	}
});

// 5.Initialize the application with genesis block and application config
const app = Application.defaultApplication(genesisBlockDevnet, appConfig);

// 6.Register custom Restaurant Module
app.registerModule(RestaurantModule);
app.registerPlugin(HTTPAPIPlugin);

// 7.Run the application
app
	.run()
	.then(() => console.info('Restaurants Blockchain running....'))
	.catch(console.error);