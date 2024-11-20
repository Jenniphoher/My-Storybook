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

CREATE TABLE "logo" (
	"id" SERIAL PRIMARY KEY,
	"logo_img" VARCHAR (250)
);


CREATE TABLE "storybook" (
	"id" SERIAL PRIMARY KEY,
	"is_public" BOOLEAN DEFAULT FALSE,
	"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "user_gallery" (
	"id" SERIAL PRIMARY KEY,
	"title" VARCHAR (250),
	"img_url" VARCHAR (250),
	"user_id" INT REFERENCES "user" NOT NULL
);


CREATE TABLE "sb_pages" (
	"id" SERIAL PRIMARY KEY,
	"text" TEXT,
	"img_x" DECIMAL(45,38),
	"img_y" DECIMAL(45,38),
	"img_width" DECIMAL(45,38),
	"img_height" DECIMAL(45,38),
	"user_gallery_id" INT REFERENCES "user_gallery",
	"storybook_id" INT REFERENCES "storybook" NOT NULL
);

CREATE TABLE "library_category" (
	"id" SERIAL PRIMARY KEY,
	"category" VARCHAR (250)
);

CREATE TABLE "library_gallery" (
	"id" SERIAL PRIMARY KEY,
	"image" VARCHAR (250),
	"category_id" INT REFERENCES "library_category" NOT NULL
);
