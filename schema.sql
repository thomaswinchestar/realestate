CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    short_title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    bedroom_count INT NOT NULL,
    area FLOAT NOT NULL,
    short_description TEXT NOT NULL
);

CREATE TABLE property_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id)
);
