const fs = require('fs');
const path = require('path');

class PortfolioTester {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    async runAllTests() {
        console.log('🚀 Starting Portfolio Website Test Suite');
        console.log('=' .repeat(50));

        await this.testFileStructure();
        await this.testHTMLContent();
        await this.testCSSFile();
        await this.testJSFile();
        await this.testHTMLValidation();
        await this.testResponsiveElements();
        await this.testAccessibility();

        this.printSummary();
    }

    async testFileStructure() {
        console.log('\n📁 Testing File Structure...');
        
        const requiredFiles = [
            'index.html',
            'css/styles.css',
            'js/script.js'
        ];

        for (const file of requiredFiles) {
            const exists = fs.existsSync(file);
            this.test(`File exists: ${file}`, exists);
        }

        // Check for additional recommended files
        const recommendedFiles = [
            'README.md',
            'package.json'
        ];

        for (const file of recommendedFiles) {
            const exists = fs.existsSync(file);
            if (exists) {
                this.test(`Recommended file exists: ${file}`, true);
            } else {
                console.log(`   ⚠️  Recommended file missing: ${file}`);
            }
        }
    }

    async testHTMLContent() {
        console.log('\n📄 Testing HTML Content...');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Test DOCTYPE
            this.test('HTML5 DOCTYPE present', htmlContent.trim().toLowerCase().startsWith('<!doctype html>'));
            
            // Test meta tags
            this.test('Charset meta tag present', htmlContent.includes('charset="UTF-8"'));
            this.test('Viewport meta tag present', htmlContent.includes('name="viewport"'));
            
            // Test title
            this.test('Title tag present', htmlContent.includes('<title>') && htmlContent.includes('</title>'));
            
            // Test CSS link
            this.test('CSS stylesheet linked', htmlContent.includes('href="css/styles.css"'));
            
            // Test JS script
            this.test('JavaScript file linked', htmlContent.includes('src="js/script.js"'));
            
            // Test required sections
            const requiredSections = ['home', 'about', 'projects', 'contact'];
            for (const section of requiredSections) {
                this.test(`Section "${section}" present`, htmlContent.includes(`id="${section}"`));
            }
            
            // Test navigation
            this.test('Navigation menu present', htmlContent.includes('nav') && htmlContent.includes('nav-links'));
            
            // Test project cards
            this.test('Project cards present', htmlContent.includes('project-card'));
            
            // Test contact information
            this.test('Email in contact section', htmlContent.toLowerCase().includes('email'));
            this.test('Phone in contact section', htmlContent.toLowerCase().includes('phone'));
            
        } catch (error) {
            this.test('HTML file readable', false, error.message);
        }
    }

    async testCSSFile() {
        console.log('\n🎨 Testing CSS File...');
        
        try {
            const cssContent = fs.readFileSync('css/styles.css', 'utf8');
            
            // Test if CSS has content
            this.test('CSS file has content', cssContent.trim().length > 0);
            
            // Test for common CSS patterns
            this.test('CSS contains body styles', cssContent.includes('body'));
            this.test('CSS contains header styles', cssContent.includes('header') || cssContent.includes('nav'));
            this.test('CSS contains responsive rules', cssContent.includes('@media'));
            
            // Test for modern CSS practices
            this.test('Uses modern CSS units', cssContent.includes('rem') || cssContent.includes('em') || cssContent.includes('vh') || cssContent.includes('vw'));
            
        } catch (error) {
            this.test('CSS file readable', false, error.message);
        }
    }

    async testJSFile() {
        console.log('\n⚡ Testing JavaScript File...');
        
        try {
            const jsContent = fs.readFileSync('js/script.js', 'utf8');
            
            // Test if JS has content
            this.test('JavaScript file has content', jsContent.trim().length > 0);
            
            // Test for DOM manipulation
            this.test('Uses DOM manipulation', 
                jsContent.includes('document.querySelector') || 
                jsContent.includes('document.getElementById') ||
                jsContent.includes('document.getElementsBy'));
            
            // Test for event listeners
            this.test('Has event listeners', 
                jsContent.includes('addEventListener') || 
                jsContent.includes('onclick'));
            
            // Test for smooth scrolling (common in portfolios)
            this.test('Implements smooth scrolling', jsContent.includes('scrollIntoView'));
            
            // Check for modern JavaScript
            this.test('Uses modern JavaScript', 
                jsContent.includes('const ') || 
                jsContent.includes('let ') ||
                jsContent.includes('=>'));
            
        } catch (error) {
            this.test('JavaScript file readable', false, error.message);
        }
    }

    async testHTMLValidation() {
        console.log('\n✅ Testing HTML Validation...');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Basic HTML validation checks
            const openTags = (htmlContent.match(/<[^/][^>]*>/g) || []).length;
            const closeTags = (htmlContent.match(/<\/[^>]*>/g) || []).length;
            const selfClosingTags = (htmlContent.match(/<[^>]*\/>/g) || []).length;
            
            // This is a simplified check - in real scenarios you'd use an HTML validator
            this.test('Basic tag balance check', openTags >= closeTags);
            
            // Check for semantic HTML
            this.test('Uses semantic HTML', 
                htmlContent.includes('<header>') || 
                htmlContent.includes('<nav>') || 
                htmlContent.includes('<section>') ||
                htmlContent.includes('<main>'));
            
            // Check for proper heading hierarchy
            this.test('Has main heading (h1)', htmlContent.includes('<h1>'));
            this.test('Has secondary headings', htmlContent.includes('<h2>') || htmlContent.includes('<h3>'));
            
        } catch (error) {
            this.test('HTML validation check', false, error.message);
        }
    }

    async testResponsiveElements() {
        console.log('\n📱 Testing Responsive Design Elements...');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            const cssContent = fs.readFileSync('css/styles.css', 'utf8');
            
            // Test viewport meta tag
            this.test('Viewport meta tag configured', 
                htmlContent.includes('width=device-width') && 
                htmlContent.includes('initial-scale=1'));
            
            // Test CSS media queries
            this.test('CSS has media queries', cssContent.includes('@media'));
            
            // Test flexible layout elements
            this.test('Uses flexible layout', 
                cssContent.includes('flex') || 
                cssContent.includes('grid') ||
                cssContent.includes('max-width'));
            
        } catch (error) {
            this.test('Responsive design check', false, error.message);
        }
    }

    async testAccessibility() {
        console.log('\n♿ Testing Accessibility Features...');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Test for alt attributes on images (if any)
            const images = htmlContent.match(/<img[^>]*>/g) || [];
            if (images.length > 0) {
                const imagesWithAlt = images.filter(img => img.includes('alt='));
                this.test('Images have alt attributes', imagesWithAlt.length === images.length);
            } else {
                console.log('   ℹ️  No images found to test for alt attributes');
            }
            
            // Test for language attribute
            this.test('HTML has language attribute', htmlContent.includes('lang='));
            
            // Test for proper heading structure
            this.test('Has proper heading structure', htmlContent.includes('<h1>'));
            
            // Test for link text (not just "click here")
            const links = htmlContent.match(/<a[^>]*>([^<]*)<\/a>/g) || [];
            const goodLinks = links.filter(link => {
                const text = link.match(/>([^<]*)</)[1];
                return text && text.trim().length > 0 && !text.toLowerCase().includes('click here');
            });
            
            if (links.length > 0) {
                this.test('Links have descriptive text', goodLinks.length === links.length);
            }
            
        } catch (error) {
            this.test('Accessibility check', false, error.message);
        }
    }

    test(description, condition, errorMessage = '') {
        const status = condition ? '✅ PASS' : '❌ FAIL';
        console.log(`   ${status}: ${description}`);
        
        if (!condition && errorMessage) {
            console.log(`      Error: ${errorMessage}`);
        }
        
        if (condition) {
            this.passed++;
        } else {
            this.failed++;
        }
        
        this.tests.push({ description, passed: condition, error: errorMessage });
    }

    printSummary() {
        console.log('\n' + '=' .repeat(50));
        console.log('📊 TEST SUMMARY');
        console.log('=' .repeat(50));
        
        const total = this.passed + this.failed;
        const percentage = total > 0 ? Math.round((this.passed / total) * 100) : 0;
        
        console.log(`Total Tests: ${total}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Success Rate: ${percentage}%`);
        
        if (percentage >= 90) {
            console.log('\n🎉 Excellent! Your portfolio website looks great!');
        } else if (percentage >= 70) {
            console.log('\n👍 Good job! Consider addressing the failed tests for improvement.');
        } else {
            console.log('\n🔧 Your website needs some work. Please address the failed tests.');
        }
        
        if (this.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.tests.filter(test => !test.passed).forEach(test => {
                console.log(`   • ${test.description}`);
                if (test.error) {
                    console.log(`     Error: ${test.error}`);
                }
            });
        }
        
        console.log('\n💡 Tips for improvement:');
        console.log('   • Ensure all files are properly linked');
        console.log('   • Add responsive design with media queries');
        console.log('   • Include proper meta tags for SEO');
        console.log('   • Use semantic HTML elements');
        console.log('   • Add alt attributes to images');
        console.log('   • Test your website on different devices');
    }
}

// Run the tests
const tester = new PortfolioTester();
tester.runAllTests().catch(console.error);
