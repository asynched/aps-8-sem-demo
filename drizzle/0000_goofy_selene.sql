CREATE TABLE `reports` (
	`report_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`ip` text NOT NULL,
	`severity` text NOT NULL,
	`city` text NOT NULL,
	`country` text NOT NULL,
	`state` text NOT NULL,
	`suburb` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `reports_city_index` ON `reports` (`city`);--> statement-breakpoint
CREATE INDEX `reports_country_index` ON `reports` (`country`);--> statement-breakpoint
CREATE INDEX `reports_state_index` ON `reports` (`state`);