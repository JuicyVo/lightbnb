INSERT INTO users (name,email,password)
VALUES ('William', 'wv@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bob', 'bob@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Kolby', 'kolby@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
-- VALUES (1, 'Dirt Hut', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 60, 1, 1, 1, 'Canada', 'Kingsway', 'Vancouver', 'BC','VVV888', TRUE),
-- (1, 'Cobblestone House', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 60, 2, 2, 2, 'Canada', 'Kingsway', 'Vancouver', 'BC','VVV888', TRUE),
-- (1, 'Diamond Mansion', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 500, 4, 3, 3, 'Canada', 'Kingsway', 'Vancouver', 'BC', 'V1V 1V1', TRUE);

-- INSERT INTO reservations (start_date, end_date, property_id, guest_id)
-- VALUES ('2018-09-11', '2018-09-26', 1, 1),
-- ('2019-01-04', '2019-02-01', 2, 2),
-- ('2021-10-01', '2021-10-14', 3, 3);


-- INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
-- VALUES (3, 1, 28, 4, 'placeholder message'),
-- (3, 2, 29, 4, 'placeholder message'),
-- (1, 2, 28, 4, 'placeholder message');