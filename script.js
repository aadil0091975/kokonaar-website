const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

// Toggle mobile menu
mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Product Data
const productData = {
    cocopeat: {
        title: "Premium Cocopeat",
        images: ["assets/images/cocopeat.png", "assets/images/cocopeat_alt.png"],
        description: "Our cocopeat is washed, dried, and compressed into blocks. It is an excellent organic soil conditioner and growing medium that retains water perfectly while providing optimal aeration for roots.",
        features: [
            "High water retention capacity",
            "100% natural and biodegradable",
            "Promotes strong root growth",
            "Ideal for potting mixes and greenhouses"
        ]
    },
    coco_chips: {
        title: "Coco Chips",
        images: ["assets/images/coco_chips.png"],
        description: "Cut from the coconut husk, these premium chips are perfect for orchids, anthuriums, and other epiphytes. They provide excellent drainage while maintaining the perfect moisture level.",
        features: [
            "Excellent drainage and aeration",
            "Resists fungal growth",
            "Lasts longer than bark",
            "Sustainably sourced"
        ]
    },
    coir_fibre: {
        title: "Coir Fibre",
        images: ["assets/images/coir_fibre.png"],
        description: "Extracted from the protective husk of the coconut, this golden fibre is incredibly strong and durable. Used in a variety of industrial and commercial applications.",
        features: [
            "High tensile strength",
            "Naturally resistant to rot and saltwater",
            "Used for mattresses, ropes, and brushes",
            "Eco-friendly alternative to synthetic fibres"
        ]
    },
    geo_textiles: {
        title: "Coir Geo Textiles",
        images: ["assets/images/geo_textiles.png"],
        description: "Our woven coir netting is the ultimate natural solution for soil erosion control. It protects the soil, holds moisture, and allows vegetation to easily establish itself.",
        features: [
            "100% biodegradable netting",
            "Prevents soil erosion on slopes",
            "Enhances water absorption",
            "Degrades naturally over 3-5 years"
        ]
    },
    coir_mats: {
        title: "Coir Mats",
        images: ["assets/images/coir_mats.png"],
        description: "Elegant and extremely durable, our woven coir mats are perfect for both residential and commercial entryways. They naturally scrape dirt from shoes and resist moisture.",
        features: [
            "Tough, natural bristles trap dirt",
            "Resists mold and mildew",
            "Non-slip backing options available",
            "Customizable designs and sizes"
        ]
    },
    garden_articles: {
        title: "Garden Articles",
        images: ["assets/images/garden_articles.png"],
        description: "A premium range of eco-friendly gardening products including coir pots, hanging basket liners, and moss poles to support your plant's natural growth.",
        features: [
            "Roots can penetrate directly through the pots",
            "100% biodegradable - plant pot and all",
            "Excellent air pruning for roots",
            "Beautiful natural aesthetic"
        ]
    },
    grow_bags: {
        title: "Open Top Grow Bags",
        images: ["assets/images/grow_bags.png"],
        description: "Ready-to-use coir substrate compressed into specialized plastic bags with an open top. Ideal for commercial hydroponics, tomatoes, cucumbers, and berries.",
        features: [
            "Optimized air-to-water ratio",
            "UV treated plastic for greenhouse use",
            "Pre-cut drainage and plant holes available",
            "Saves time and labor costs"
        ]
    },
    needle_felt: {
        title: "Needle Felt",
        images: ["assets/images/needle_felt.png"],
        description: "A versatile non-woven mat made by mechanically interlocking coir fibres. Used for everything from horticultural weed control to acoustic and thermal insulation.",
        features: [
            "Excellent weed barrier for landscaping",
            "High acoustic and thermal insulation properties",
            "Used in mattress manufacturing",
            "Breathable and natural"
        ]
    }
};

// Modal Logic
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');
const productCards = document.querySelectorAll('.product-card');

const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalFeatures = document.getElementById('modal-features');
const modalThumbnails = document.getElementById('modal-thumbnails');
const prevImgBtn = document.getElementById('prev-img');
const nextImgBtn = document.getElementById('next-img');

let currentImages = [];
let currentImgIndex = 0;

function updateModalImage(index) {
    if (index < 0) index = currentImages.length - 1;
    if (index >= currentImages.length) index = 0;
    currentImgIndex = index;
    modalImg.src = currentImages[currentImgIndex];
    
    // Update active thumbnail
    document.querySelectorAll('.modal-thumbnails img').forEach((img, i) => {
        if (i === currentImgIndex) img.classList.add('active');
        else img.classList.remove('active');
    });
}

if (prevImgBtn && nextImgBtn) {
    prevImgBtn.addEventListener('click', () => updateModalImage(currentImgIndex - 1));
    nextImgBtn.addEventListener('click', () => updateModalImage(currentImgIndex + 1));
}

// Open modal
productCards.forEach(card => {
    card.addEventListener('click', () => {
        const productKey = card.getAttribute('data-product');
        const data = productData[productKey];

        currentImages = data.images;
        currentImgIndex = 0;
        
        // Setup thumbnails
        if (modalThumbnails) {
            modalThumbnails.innerHTML = '';
            if (currentImages.length > 1) {
                currentImages.forEach((imgSrc, index) => {
                    const thumb = document.createElement('img');
                    thumb.src = imgSrc;
                    if (index === 0) thumb.classList.add('active');
                    thumb.addEventListener('click', () => updateModalImage(index));
                    modalThumbnails.appendChild(thumb);
                });
                prevImgBtn.style.display = 'block';
                nextImgBtn.style.display = 'block';
            } else {
                prevImgBtn.style.display = 'none';
                nextImgBtn.style.display = 'none';
            }
        }

        updateModalImage(0);
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        // Populate features list
        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Contact Form WhatsApp Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('sender-name').value;
        const email = document.getElementById('sender-email').value;
        const message = document.getElementById('sender-message').value;
        
        const waNumber = "919995293400";
        const waText = `Hello KOKONAAR!%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
        
        window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    });
}

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load

// Color Shifting Background on Scroll
window.addEventListener('scroll', () => {
    // Calculate how far down the page we are (0.0 to 1.0)
    const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = scrollPx / winHeightPx;

    let r, g, b;

    if (scrolled < 0.33) {
        // Shift from Off-White to Very Light Green
        // #faf9f6 (250, 249, 246) -> #e8f5e9 (232, 245, 233)
        const percent = scrolled / 0.33;
        r = Math.round(250 + (232 - 250) * percent);
        g = Math.round(249 + (245 - 249) * percent);
        b = Math.round(246 + (233 - 246) * percent);
    } else if (scrolled < 0.66) {
        // Shift from Light Green to Soft Beige
        // #e8f5e9 (232, 245, 233) -> #f5f0e6 (245, 240, 230)
        const percent = (scrolled - 0.33) / 0.33;
        r = Math.round(232 + (245 - 232) * percent);
        g = Math.round(245 + (240 - 245) * percent);
        b = Math.round(233 + (230 - 233) * percent);
    } else {
        // Shift from Soft Beige back to Light Green for the footer area
        const percent = (scrolled - 0.66) / 0.34;
        r = Math.round(245 + (232 - 245) * percent);
        g = Math.round(240 + (245 - 240) * percent);
        b = Math.round(230 + (233 - 230) * percent);
    }

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
