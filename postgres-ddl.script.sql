-- Create the "book" table
CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP(3) WITH TIME ZONE,
    name VARCHAR NOT NULL,
    "averageRating" FLOAT8 NOT NULL DEFAULT 0,
    "totalRatings" FLOAT8 NOT NULL DEFAULT 0
);

-- Create the "book_borrowing" table
CREATE TABLE book_borrowing (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP(3) WITH TIME ZONE,
    "isReturned" BOOLEAN NOT NULL DEFAULT false,
    score INTEGER,
    "borrowedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    "returnedAt" TIMESTAMP WITH TIME ZONE,
    "userId" INTEGER,
    "bookId" INTEGER
);

-- Create the "user" table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) WITH TIME ZONE DEFAULT now(),
    deleted_at TIMESTAMP(3) WITH TIME ZONE,
    name VARCHAR NOT NULL
);

-- Add foreign key constraints
ALTER TABLE book_borrowing
ADD CONSTRAINT fk_user
FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE book_borrowing
ADD CONSTRAINT fk_book
FOREIGN KEY ("bookId") REFERENCES book(id) ON DELETE NO ACTION ON UPDATE NO ACTION;