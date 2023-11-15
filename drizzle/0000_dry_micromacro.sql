CREATE TABLE `reports` (
	`report_id` serial AUTO_INCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`ip` varchar(255) NOT NULL,
	`severity` varchar(6) NOT NULL,
	`city` varchar(255) NOT NULL,
	`country` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL,
	`suburb` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT now(),
	CONSTRAINT `reports_report_id` PRIMARY KEY(`report_id`)
);
--> statement-breakpoint
CREATE INDEX `reports_city_index` ON `reports` (`city`);--> statement-breakpoint
CREATE INDEX `reports_country_index` ON `reports` (`country`);--> statement-breakpoint
CREATE INDEX `reports_state_index` ON `reports` (`state`);