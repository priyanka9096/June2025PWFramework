import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { test, expect  } from '../fixtures/baseFixtures';


let search = [
    {searchkey: 'macbook', productname: 'MacBook Pro', imagecount: 4},
    {searchkey: 'macbook', productname: 'MacBook Air', imagecount: 4},
    {searchkey: 'samsung', productname: 'Samsung Galaxy Tab 10.1', imagecount: 7},
];

for (let product of search) {

    test(`verify product Header ${product.productname}`, {tag:['@product','@sanity','@reggression']} , async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
            
        expect(await productInfoPage.getProductHeader()).toBe(product.productname);

    });
    
};


for (let product of search) {
    test(`verify product Images ${product.productname} : ${product.imagecount}`, {tag:['@product','@sanity']} , async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch(product.searchkey);
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct(product.productname);
            
        expect(await productInfoPage.getProductImagesCount()).toBe(product.imagecount);

    });
  
};

test(`verify product MetaData`, async ({ homePage }) => {

        let resultsPage: ResultsPage = await homePage.doSearch('macbook');
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');

        let actualProductFullDetail =await productInfoPage.getProductDetails();

        expect.soft(actualProductFullDetail.get('header')).toBe('MacBook Pro');
        expect.soft(actualProductFullDetail.get('Brand')).toBe('Apple');
        expect.soft(actualProductFullDetail.get('Product Code')).toBe('Product 18');
        expect.soft(actualProductFullDetail.get('Reward Points')).toBe('800');
        expect.soft(actualProductFullDetail.get('Availability')).toBe('Out Of Stock');
        
    });


    test(`verify product Pricing`, async ({ homePage }) => {

        

        let resultsPage: ResultsPage = await homePage.doSearch('macbook');
        
        let productInfoPage: ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');

        let actualProductFullDetail =await productInfoPage.getProductDetails();

        expect.soft(actualProductFullDetail.get('header')).toBe('MacBook Pro');
        expect.soft(actualProductFullDetail.get('price')).toBe('$2,000.00');
        expect.soft(actualProductFullDetail.get('extaxprice')).toBe('$2,000.00');
        
    });