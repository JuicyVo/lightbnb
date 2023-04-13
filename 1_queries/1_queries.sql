-- SELECT id, name, email, password
-- from users
-- WHERE email = 'tristanjacobs@gmail.com';

-- SELECT AVG (end_date - start_date) as average_duration
-- FROM reservations;

-- my answer
-- SELECT properties.id, properties.title, properties.cost_per_night, AVG (property_reviews.rating)
-- FROM properties
-- JOIN property_reviews 
-- ON properties.id = property_reviews.property_id
-- WHERE rating >= 4 AND city = 'Vancouver'
-- GROUP BY properties.id, properties.title, properties.cost_per_night
-- ORDER BY cost_per_night ASC
-- LIMIT 10;

-- answer given
-- SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
-- FROM properties
-- LEFT JOIN property_reviews ON properties.id = property_id
-- WHERE city LIKE '%ancouv%'
-- GROUP BY properties.id
-- HAVING avg(property_reviews.rating) >= 4
-- ORDER BY cost_per_night
-- LIMIT 10;

-- most Visted cities
-- SELECT properties.city, COUNT(reservations) AS total_reservations 
-- FROM reservations
-- JOIN properties
-- ON reservations.property_id = properties.id
-- GROUP BY properties.city
-- ORDER BY total_reservations DESC
-- LIMIT 10;

-- All My Reservations
-- SELECT reservations.id, properties.title, reservations.start_date, 
-- properties.cost_per_night, AVG (property_reviews.rating)
-- FROM users
-- JOIN reservations ON users.id = reservations.guest_id
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON properties.id = property_reviews.property_id
-- WHERE users.id = 1
-- GROUP BY properties.id, reservations.id

-- answer provided by compass
-- SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
-- FROM reservations
-- JOIN properties ON reservations.property_id = properties.id
-- JOIN property_reviews ON properties.id = property_reviews.property_id
-- WHERE reservations.guest_id = 1
-- GROUP BY properties.id, reservations.id
-- ORDER BY reservations.start_date
-- LIMIT 10;
