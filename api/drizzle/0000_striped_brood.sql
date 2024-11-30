CREATE TABLE IF NOT EXISTS "dolls" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dolls_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"dollName" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"viewsCount" integer DEFAULT 0,
	"image" varchar(255) NOT NULL,
	"price" double precision NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
