// Lida com enviar os Ids dos produtos para o localStorage
export function sendItemsToCloud(productId, categoryId) {
  const cloudProductsIds = localStorage.getItem('CartIds');
  let productsIds = [];

  if (cloudProductsIds) {
    productsIds = JSON.parse(cloudProductsIds);
  }

  productsIds.push({ productId, categoryId });
  const stringProducts = JSON.stringify(productsIds);

  localStorage.setItem('CartIds', stringProducts);
}

// Lida com resgatar os ids dos produtos do localStorage
export function getItemsFromCloud() {
  const cloudProductsIds = localStorage.getItem('CartIds');

  if (cloudProductsIds) {
    return JSON.parse(cloudProductsIds);
  }

  return [];
}
