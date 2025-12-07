const Sale = require('../models/Sale');

/**
 * buildFilter - translates query params into mongoose filters
 */
function buildFilter(query) {
  const filter = {};

  // full-text search on customerName and phoneNumber (case-insensitive)
  if (query.q) {
    const q = query.q.trim();
    filter.$or = [
      { customerName: { $regex: q, $options: 'i' } },
      { phoneNumber: { $regex: q, $options: 'i' } }
    ];
  }

  if (query.regions) {
    const regions = query.regions.split(',').map(s=>s.trim());
    filter.customerRegion = { $in: regions };
  }
  if (query.genders) {
    filter.gender = { $in: query.genders.split(',').map(s=>s.trim()) };
  }
  if (query.ageMin || query.ageMax) {
    filter.age = {};
    if (query.ageMin) filter.age.$gte = Number(query.ageMin);
    if (query.ageMax) filter.age.$lte = Number(query.ageMax);
  }
  if (query.categories) {
    filter.productCategory = { $in: query.categories.split(',').map(s=>s.trim()) };
  }
  if (query.tags) {
    const tags = query.tags.split(',').map(s=>s.trim());
    filter.tags = { $all: tags };
  }
  if (query.paymentMethods) {
    filter.paymentMethod = { $in: query.paymentMethods.split(',').map(s=>s.trim()) };
  }
  if (query.dateFrom || query.dateTo) {
    filter.date = {};
    if (query.dateFrom) filter.date.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.date.$lte = new Date(query.dateTo);
  }

  return filter;
}

function buildSort(sortKey) {
  switch(sortKey) {
    case 'date_desc': return { date: -1 };
    case 'quantity_desc': return { quantity: -1 };
    case 'customer_asc': return { customerName: 1 };
    default: return { date: -1 };
  }
}

async function querySales(query) {
  const page = Math.max(1, parseInt(query.page || '1'));
  const pageSize = 10;
  const filter = buildFilter(query);
  const sort = buildSort(query.sort);

  const skip = (page - 1) * pageSize;
  const [total, items] = await Promise.all([
    Sale.countDocuments(filter),
    Sale.find(filter).sort(sort).skip(skip).limit(pageSize)
  ]);

  return { total, page, pageSize, items };
}

module.exports = { querySales };
