import{ LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage';
import{ test,expect } from '../fixtures/baseFixtures';



test('verify valid login @login ',
    
     {
       
        annotation:[
            {type: 'epic' , description: 'EPIC 100 - Desing login page for OpenCart App'},
            {type: 'feature' , description:'Login Page feature' },
            {type: 'story' , description: 'US 50 - user can login to app'},
            {type: 'sevrity ', description: 'Blocker'},
            {type:'owner', description:'Priya patil'}
        ]
    },
    
    async ({ homePage }) =>{
    await expect(homePage.page).toHaveTitle('My Account');

});

test.skip('verify Invalid login @wip',async ({page , baseURL}) =>{

    //AAA=Arange Act Assert
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    
    await loginPage.doLogin('abc@gmail.com','123456789');
    const errorMsg=await loginPage.getInvalidLoginMessage();
    expect(errorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
});

