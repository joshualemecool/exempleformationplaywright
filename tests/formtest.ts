import { Locator, Page } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import testdata from '../dataset/category.json';

export class PageCool {
    subject: Locator;
    input: Locator;
    firstName: Locator;
    lastName: Locator;
    userEmail: Locator; 
    sport: Locator;
    number: Locator;
    submit: Locator;
    gender: Locator;

    constructor(private page: Page) {
        this.subject = page.locator('.subjects-auto-complete__value-container');
        this.input = page.locator('#subjectsInput');
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.userEmail = page.locator('#userEmail');
        this.sport = page.locator('#hobbies-checkbox-1');
        this.number = page.locator('#userNumber');
        this.submit = page.locator('#submit');
        this.gender = page.locator('label[for="gender-radio-1"]');


    }
    async goto() {
    await this.page.goto(process.env.URL!);
}

async fillSubject() {
    await this.subject.click();
    await this.firstName.fill(testdata.poulet.pouletroti);
    await this.lastName.fill(testdata.boeuf.boeufbourguignon);
    await this.gender.scrollIntoViewIfNeeded();
    await this.gender.click();
    await this.userEmail.fill(faker.internet.email());
    await this.input.fill('Maths');
    await this.input.press('Enter');
    await this.number.fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString());
    await this.submit.click();
}

}