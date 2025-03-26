let isCatalogOpen: boolean = false;

document.addEventListener('DOMContentLoaded', function () {
  const homeLink = document.getElementById('homeLink') as HTMLAnchorElement;
  const catalogLink = document.getElementById('catalogLink') as HTMLAnchorElement;

  homeLink.addEventListener('click', function (event: Event) {
    event.preventDefault();
    loadHomePage();
  });

  catalogLink.addEventListener('click', function (event: Event) {
    event.preventDefault();
    loadCatalog();
  });

  loadHomePage();
});

function loadHomePage(): void {
  const categoriesContainer = document.getElementById('categories') as HTMLElement;
  categoriesContainer.innerHTML = '';

  const productsContainer = document.getElementById('products') as HTMLElement;
  productsContainer.innerHTML = '';
}

interface Category {
  name: string;
}

interface Product {
  name: string;
  image: string;
  description: string;
  price: string;
}

function loadCategories(): void {
  const categoriesContainer = document.getElementById('categories') as HTMLElement;
  categoriesContainer.innerHTML = '';

  fetch('./api/categories.json')
    .then(response => response.json())
    .then((data: Category[]) => {
      data.forEach(category => {
        const categoryLink = document.createElement('a');
        categoryLink.href = '#';
        categoryLink.textContent = category.name;
        categoriesContainer.appendChild(categoryLink);

        categoryLink.addEventListener('click', function (event: Event) {
          event.preventDefault();
          isCatalogOpen = true;
          loadCategory(category.name);
        });
      });

      const specialsLink = document.createElement('a');
      specialsLink.href = '#';
      specialsLink.textContent = 'Specials';
      categoriesContainer.appendChild(specialsLink);

      specialsLink.addEventListener('click', function (event: Event) {
        event.preventDefault();
        isCatalogOpen = true;
        loadSpecials();
      });
    });
}

function loadCategory(categoryName: string): void {
  const productsContainer = document.getElementById('products') as HTMLElement;
  productsContainer.innerHTML = '';

  fetch(`./api/categories/${categoryName}.json`)
    .then(response => response.json())
    .then((data: Product[]) => {
      data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.name;
        productDiv.appendChild(productImg);

        const productName = document.createElement('h3');
        productName.textContent = product.name;
        productDiv.appendChild(productName);

        const productDescription = document.createElement('p');
        productDescription.textContent = product.description;
        productDiv.appendChild(productDescription);

        const productPrice = document.createElement('p');
        productPrice.textContent = `Price: ${product.price}`;
        productDiv.appendChild(productPrice);

        productsContainer.appendChild(productDiv);
      });
    });
}

function loadSpecials(): void {
  const productsContainer = document.getElementById('products') as HTMLElement;
  productsContainer.innerHTML = '';

  const categories: string[] = ['electronics', 'clothes', 'music'];
  const randomCategory: string = categories[Math.floor(Math.random() * categories.length)];
  loadCategory(randomCategory);
}

function loadCatalog(): void {
  isCatalogOpen = true;
  loadCategories();
}
