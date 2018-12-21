require('dotenv').config();

const soap = require('soap');

const services = {
  Client: {
    url: 'https://api.mindbodyonline.com/0_5/ClientService.asmx?wsdl',
    endpoint: 'https://api.mindbodyonline.com/0_5/ClientService.asmx',
  },
  Site: {
    url: 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx?wsdl',
    endpoint: 'https://api.mindbodyonline.com/0_5_1/SiteService.asmx',
  },
  Appointment: {
    url: 'https://api.mindbodyonline.com/0_5/AppointmentService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/AppointmentService.asmx'
  },
  Class: {
    url: 'https://api.mindbodyonline.com/0_5/ClassService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/ClassService.asmx'
  },
  Staff: {
    url: 'https://api.mindbodyonline.com/0_5/StaffService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/StaffService.asmx'
  },
  Data: {
    url: 'https://api.mindbodyonline.com/0_5/DataService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/DataService.asmx'
  },
  Finder: {
    url: 'https://api.mindbodyonline.com/0_5/FinderService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/FinderService.asmx'
  },
  Sale: {
    url: 'https://api.mindbodyonline.com/0_5/SaleService.asmx?WSDL',
    endpoint: 'https://api.mindbodyonline.com/0_5/SaleService.asmx'
  }
};

const createSoapClient =  (service, method) =>
  new Promise((resolve, reject) => {
    soap.createClient(services[service].url, (error, client) => {
      if (error) reject(error);
      else {
        client.setEndpoint(services[service].endpoint);
        resolve(client[`${service}_x0020_Service`][`${service}_x0020_ServiceSoap`]);
      }
    });
});

class MindBodyAPI {
  constructor(data = {}) {
    this.SourceCredentials = {
      SourceName: data.sourceName || process.env['MB_SOURCE_NAME'],
      Password: data.sourcePassword || process.env['MB_SOURCE_PASSWORD'],
      SiteIDs: {
        int: [data.siteID || process.env['MB_SITE_ID']],
      },
    };

  
    this.UserCredentials = {
      Username: data.username || process.env['MB_USERNAME'],
      Password: data.password || process.env['MB_PASSWORD'],
      SiteIDs: {
        int: [data.siteID || process.env['MB_SITE_ID']],
      },
    };
  }

  async call(service, method, values) {
    const params = {
      Request: Object.assign(values, {
        SourceCredentials: this.SourceCredentials
        //UserCredentials: this.UserCredentials
      })
    };
    return new Promise((resolve, reject) =>
      createSoapClient(service, method).then((client) =>{
        client[method](params, (error, result) => {
          if (error) reject(error);
          else  resolve(result[`${method}Result`]);
        })
      })
    ); 
  }

}

module.exports = MindBodyAPI;
