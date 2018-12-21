# mindbody-soap-api-interface
A SOAP interface for MindBody API written in node.js.


API documentation:
https://developers.mindbodyonline.com/PublicDocumentation/Overview?version=v5.1

```
mindBodyAPI.call("Site", "GetLocations", {}).then(result => {
  console.log(result['Locations']['Location']);
}).catch((error)=>{
})
```
