module.exports = function (server, done) {
  var Customers = server.models.customers;
  server.dataSources.mongodbDs.automigrate('customers', function (err) {
    Customers.create({firstName: 'John', lastName: 'Doe', age: 35}, function(err, customer) {
      if(err) return done(err);
      console.log('Created customer, ERR: ', err, ' Customer persisted data:', customer);
      customer.updateAttributes({firstName:'Jane', age: 32}, function(err, updatedCustomer){
        console.log('Update customer, ERR: ', err, ' Customer updated to:', updatedCustomer);
        Customers.find(function(err, data){
          if(err) return done(err);
          console.log('Fetching all data persisted in database, ERR:', err, 'all Data:', data);
          done(err);
        })
      })
    });
  });
}