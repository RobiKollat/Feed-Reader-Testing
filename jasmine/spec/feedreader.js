/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*Ans: When allFeeds is changed to be an empty array, above test,
        "RSS Feeds are defined", fails because, "Expected 0 not to be 0".  When
        allFeeds array components are restored, test again shows 0 failures.*/


        /*This test loops through each feed and determines if the URL*/
        /*defined and not empty.*/

        it('URL is defined and not empty', function(){
            allFeeds.forEach(function(feed){
                feedLink = feed.url;
                expect(feedLink).toBeDefined();
                expect(feedLink.length).not.toBe(0);
            });
        });

        /* This test looped through each feed and determines that each */
        /* feed has a name and not empty. */

        it('mane and not enpty', function(){
            allFeeds.forEach(function(feed){
                feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName.length).not.toBe(0);
            });
        });         
    });


    /* Menu test suite.*/

        describe('menu', function(){

            /* This test ensures the menu element is hidden by default.*/
            it('hidden menu', function(){
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });

        /* This test validates proper functioning of the hamburger menu toggle.*/            
            it('change menu visibility click', function(){

                /*This tests for menu display.*/
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(false);

                /*This tests for menu hide.*/
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
            });
        });

        /*Initial entries test suite.*/
        describe('Initian Entries', function(){

            /*beforeEach allows for use of asynchronous loadFeed().*/
            beforeEach(function(done){
                loadFeed(0, done);
            });

            /*tests that there is at least one entry in feed.*/
            it(' initial element is there', function(){
                expect($('.feed .entry').length).toBeGreaterThan(0);
            });
        });


        describe('New Feed Selection', function(){
            var testfeed;

        /*tests that new content is loaded by loadFeed().*/

            beforeEach(function(done){
                loadFeed(0, function(){
                    testfeed = $('.feed').html();
                    loadFeed(1, done);
                });
            });

       
            it('has been loaded', function(){
                expect($('.feed').html()).not.toEqual(testfeed);
            });
        });
}());
