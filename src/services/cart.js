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

// pega lista do local storage, separa o que for diferente do ID do X; retorna lista sem o produto e renderiza carrinho de novo

export function removeProduct(id) {
  const cloudProdutsList = localStorage.getItem('CartIds');
  const productList = JSON.parse(cloudProdutsList);

  const filtredList = productList.filter(({ productId }) => productId === id);

  localStorage.setItem('CartIds', JSON.stringify(filtredList));
}
