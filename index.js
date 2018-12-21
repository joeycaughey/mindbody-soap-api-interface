const MindBodyAPI = require('./mindbody-api.js');

const mindBodyAPI = new MindBodyAPI({
  sourceName: 'SourceName',
  sourcePassword: 'SourePassword',
  siteID: '',
  username: '',
  password: ''
});

mindBodyAPI.call("Site", "GetLocations", {}).then(result => {
	 	console.log(result['Locations']['Location']);
}).catch((error)=>{
		console.log(error)
})
