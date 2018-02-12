function createHeaders(id, content, options) {
  /*
  	Get the country from the provenance data.
    Based on the country, transform the data appropriately.
  */
  let country = content.$provenance.countryOfOrigin;
  let postalCode;
  let lastFourDigits;
  
  	switch(country){
      case 'US':
        postalCode = content.$attachments.zip;
        lastFourDigits = content.$attachments.ssn;
        break;
        
      case 'FRANCE':
				postalCode = content.$attachments.postal_code;
        lastFourDigits = content.$attachments.national_id;
        break;
    };
  
  return {
    
		// the harmonized header data. Include information to describe the harmonization.
    'callCenterVerify': {
    	'postalCode': postalCode,
    	'lastFourDigits': lastFourDigits.substr(lastFourDigits.length - 4)
    },
    'provenance': content.$provenance,
    'lineage': {
    	'harmonization': {
      	'date': fn.currentDateTime(),
      	'user': xdmp.getCurrentUser(),
      	'description': 'harmonize data to enable power the API enabling a call center operator to verify a customer ID.'
    
      }
    }
    
  };
}

module.exports = {
  createHeaders: createHeaders
};
