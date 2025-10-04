const { prisma } = require('../database/db');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;
const DEFAULT_SEARCH_LIMIT = 20;

const findAll = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.book.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.book.count(),
  ]);

  const hasMore = skip + data.length < total;

  return {
    data,
    hasMore,
    page,
    limit,
  };
};

const searchByText = async (text = '') => {
  if (!text.trim()) return { data: [] };

  const data = await prisma.book.findMany({
    where: {
      OR: [
        { name: { contains: text, mode: 'insensitive' } },
        { description: { contains: text, mode: 'insensitive' } },
        { authors: { hasSome: [text] } }, // busca no array de autores
      ],
    },
    take: DEFAULT_SEARCH_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return { data };
};

const findById = async (id) => {
  const data = await prisma.book.findUnique({
    where: { id },
  });

  return { data };
};

module.exports = {
  findAll,
  searchByText,
  findById,
};
