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
	"is_public" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" NOT NULL,
);


CREATE TABLE "user_gallery" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (250),
	"img_url" VARCHAR (250),
	"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "sb_page" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"img_x" DECIMAL(45,38),
	"img_y" DECIMAL(45,38),
	"img_width" DECIMAL(45,38),
	"img_height" DECIMAL(45,38),
	"user_gallery_id" INT REFERENCES "user_gallery" NOT NULL,
	"post_id" INT REFERENCES "post" NOT NULL
);
