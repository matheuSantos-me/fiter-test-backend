const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const books = [
      {
        name: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        description:
          "A classic novel exploring racial injustice and moral growth in the American South during the 1930s.",
        imageLink:
          "https://m.media-amazon.com/images/I/71FxgtFKcQL._SL1500_.jpg",
        publishedAt: new Date("1960-07-11"),
      },
      {
        name: "1984",
        authors: ["George Orwell"],
        description:
          "Dystopian novel depicting a totalitarian society and the consequences of government overreach.",
        imageLink:
          "https://m.media-amazon.com/images/I/615Z8aLlDXL._AC_SL1500_.jpg",
        publishedAt: new Date("1949-06-08"),
      },
      {
        name: "The Great Gatsby",
        authors: ["F. Scott Fitzgerald"],
        description:
          "A tale of wealth, love, and the American Dream set in the Roaring Twenties.",
        imageLink:
          "https://m.media-amazon.com/images/I/819wCzUTZWL._SL1500_.jpg",
        publishedAt: new Date("1925-04-10"),
      },
      {
        name: "One Hundred Years of Solitude",
        authors: ["Gabriel Garcia Marquez"],
        description:
          "Magical realist novel chronicling the Buendía families history in the fictional town of Macondo.",
        imageLink:
          "https://m.media-amazon.com/images/I/81MI6+TpYkL._SL1500_.jpg",
        publishedAt: new Date("1967-05-30"),
      },
      {
        name: "The Catcher in the Rye",
        authors: ["J.D. Salinger"],
        description:
          "A coming-of-age novel narrated by a disenchanted teenager, Holden Caulfield, in New York City.",
        imageLink:
          "https://m.media-amazon.com/images/I/91HPG31dTwL._SL1500_.jpg",
        publishedAt: new Date("1951-07-16"),
      },
      {
        name: "The Lord of the Rings",
        authors: ["J.R.R. Tolkien"],
        description:
          "Epic high-fantasy novel exploring the journey to destroy the One Ring and defeat the dark lord Sauron.",
        imageLink: "https://m.media-amazon.com/images/I/412JSB73D2L.jpg",
        publishedAt: new Date("1954-07-29"),
      },
      {
        name: "The Hitchhiker's Guide to the Galaxy",
        authors: ["Douglas Adams"],
        description:
          "Comic science fiction series following the misadventures of an unwitting human, Arthur Dent, as he travels through space.",
        imageLink:
          "https://m.media-amazon.com/images/I/81A43ktJSjL._SL1207_.jpg",
        publishedAt: new Date("1979-10-12"),
      },
      {
        name: "Good Omens",
        authors: ["Neil Gaiman", "Terry Pratchett"],
        description:
          "Humorous fantasy novel about an angel and demon working together to prevent the apocalypse.",
        imageLink:
          "https://m.media-amazon.com/images/I/91ZNU0CzphL._SL1500_.jpg",
        publishedAt: new Date("1990-05-01"),
      },
    ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { name: book.name },
      update: {},
      create: {
        ...book,
        searchable: `${book.name}, ${book.authors[0]}, ${book.description}`,
        createdAt: new Date(),
      },
    });
  }

  console.log("✅ Books inserted successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding books:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
