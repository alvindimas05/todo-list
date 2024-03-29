CREATE TABLE `todos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `time` TIME NOT NULl,
    `status` ENUM("dijadwalkan", "dikerjakan", "selesai") NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)