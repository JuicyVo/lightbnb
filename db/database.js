// const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb' //changed from bootcampx, may be cause of error in future
});

//below used to test if pool works
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const query = {
    text: 'Select * from users where email = $1',
    values: [email]
  };
  return pool.query(query)
    .then((result) => {
      console.log('testing email');
      return result.rows[0];
    })
    .catch((err) => {
      console.log(2);
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const query = {
    text: 'Select * from users where id = $1',
    values: [id]
  };
  return pool.query(query)
    .then((result) => {
      console.log (id)
      console.log('testing user id');
      console.log (result.rows[0])
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const query = {
    text: 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    values: [user.name, user.email, user.password]
  };

  return pool.query(query)
    .then(result => {
      return result.rows[0];
    })
    .catch(err => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */

const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    LIMIT $2`, [guest_id, limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */


const getAllProperties = (options, limit = 10) => {
  const queryParams = [];

  let queryString = `
  Select properties.*, avg(property_reviews.rating) as average_rating
  From properties
  Left Outer Join property_reviews ON properties.id = property_reviews.property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `Where city Like $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }
    queryParams.push(Number(options.minimum_price_per_night * 100));
    queryString += `cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }
    queryParams.push(Number(options.maximum_price_per_night * 100));
    queryString += `cost_per_night <= $${queryParams.length} `;
  }


  if (options.owner_id) {
    if (queryParams.length > 0) {
      queryString += 'AND ';
    } else {
      queryString += 'WHERE ';
    }
    queryParams.push(options.owner_id);
    queryString += `owner_id = $${queryParams.length} `;
  }

if (options.minimum_rating) {
  if (queryParams.length > 0) {
    queryString += ' AND ';
  } else {
    queryString += ' WHERE ';
  }
  queryParams.push(options.minimum_rating);
  queryString += `
    (SELECT AVG(rating) FROM property_reviews WHERE property_id = properties.id) >= $${queryParams.length} `;
}

  queryParams.push(limit);
  queryString += `
    Group by properties.id
    order by cost_per_night
    Limit $${queryParams.length};
    `;

  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
  .then((res) => res.rows)
  .catch((err) => console.log(err.message));
  // return pool.query(queryString, queryParams).then((res) => res.rows);
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const cost_per_night_cents = property.cost_per_night * 100;
  console.log(property)
  const query = {
    text: 'INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
    values: [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      cost_per_night_cents,
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      Number(property.parking_spaces),
      Number(property.number_of_bathrooms),
      Number(property.number_of_bedrooms)
    ]
  };
  return pool.query(query.text, query.values)
    .then(res => {
     
      return res.rows[0];

    })
    .catch(err => {
      console.log(err.message);
      throw err;
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
