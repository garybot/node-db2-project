
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '1234qwerty', make: 'Ford', model: 'Mustang', mileage: 1243.56},
        {vin: '2345qwerty', make: 'Chevy', model: 'Impala', mileage: 12000},
        {vin: '3456qwerty', make: 'Volkswagon', model: 'Beetle', mileage: 1243.56}
      ]);
    });
};
