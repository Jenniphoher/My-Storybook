CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR (250),
	"last_name" VARCHAR (250),
	"email" VARCHAR (250),
	"username" VARCHAR (250),
	"password" VARCHAR (250),
	"profile_photo" VARCHAR (250),
	"cover_photo" VARCHAR (250)
);

CREATE TABLE "post" (
	"id" SERIAL PRIMARY KEY,
	"text" VARCHAR (250),
	"is_public" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" NOT NULL,
	"user_gallery_id" INT REFERENCES "user_gallery",
	"x_position" INT,
	"y_position" INT,
	"img_width" INT,
	"img_height" INT
);

CREATE TABLE "user_gallery" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (250),
	"img_url" VARCHAR (250),
	"user_id" INT REFERENCES "user" NOT NULL,

);