import { Locator ,Page  }  from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtils";

export class ProductInfoPage{
   private readonly page: Page;
private readonly eleUtil:ElementUtil;
private readonly header:Locator;
private readonly imageCount:Locator;
private readonly productMetaData:Locator;
private readonly productPriceData:Locator;

private readonly productMap = new Map<string, string | number | null>();



constructor (page:Page){
    this.page=page;
    this.eleUtil=new ElementUtil(page);
    this.header=page.locator('h1');
    this.imageCount=page.locator('div#content img');
    this.productMetaData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[1]/li`);
    this.productPriceData = page.locator(`(//div[@id='content']//ul[@class='list-unstyled'])[2]/li`)

}

async getProductHeader():Promise<string>{
    const header=await this.eleUtil.getInnerText(this.header);
    console.log('product header : ' +header);
    return header.trim();
}

async getProductImagesCount(): Promise<number> {
        await this.eleUtil.waitForElementVisible(this.imageCount);
        const imagesCount = await this.imageCount.count();
        console.log(`total number of images for ${await this.getProductHeader()} ==> ${imagesCount}`);
        return imagesCount;
    }

    async getProductDetails():Promise<Map<string,string|number|null>>{
        this.productMap.set('header', await this.getProductHeader());
        this.productMap.set('imagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceingData();

        console.log(`Full product details for product: ${await this.getProductHeader()}`);
        this.printproductDetails();
        return this.productMap;
    }

    private async printproductDetails(){
        for(const [key , value] of this.productMap){
            console.log(key,value);
        }
    }
    
    
    private async getProductMetaData(){
        let productMetaData : string[] = await this.productMetaData.allInnerTexts();
        for(let meta of productMetaData){
            let metadata:string[] = meta.split(':');
            let metaKey = metadata[0].trim();
            let metaValue = metadata[1].trim();

            this.productMap.set(metaKey,metaValue);

        }
    }


    private async getProductPriceingData(){
        let productPricing : string[] = await this.productPriceData.allInnerTexts();
        let productprice = productPricing[0].trim();
        let productExTax = productPricing[1].split(':')[1].trim();


        this.productMap.set('price', productprice);
        this.productMap.set('extaxprice', productExTax);

       
        }
}