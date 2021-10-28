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

export function removeProduct(id) {
  const cloudProdutsList = localStorage.getItem('CartIds');
  const productList = JSON.parse(cloudProdutsList);

  let filtredList = productList.filter(({ productId }) => productId !== id);
  // localStorage.removeItem('CartIds');

  localStorage.setItem('CartIds', JSON.stringify(filtredList));
}
