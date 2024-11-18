    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "none" ? "block" : "none";
    });
    

       // JavaScript for pagination and category filter
   let currentPage = 1;
   const postsPerPage = 3;
   const posts = [
       { title: "The Art of Minimalistic Furniture", category: "furniture", description: "Explore the beauty of minimalism and how it can transform your living space with functional and elegant furniture pieces.", image: "https://via.placeholder.com/400x300" },
       { title: "How to Choose the Right Sofa for Your Home", category: "furniture", description: "A guide to selecting the perfect sofa based on comfort, size, and style for your living room.", image: "https://via.placeholder.com/400x300" },
       { title: "2024 Interior Design Trends to Watch", category: "design", description: "From sustainable design to bold color palettes, these are the trends to watch for in 2024.", image: "https://via.placeholder.com/400x300" },
       { title: "Maximizing Small Spaces with Furniture", category: "furniture", description: "Learn how to make the most of your small living spaces with multifunctional furniture pieces.", image: "https://via.placeholder.com/400x300" },
       { title: "The Role of Lighting in Interior Design", category: "design", description: "How lighting can dramatically change the ambiance and functionality of a room.", image: "https://via.placeholder.com/400x300" },
       { title: "Sustainable Design Practices for Your Home", category: "trends", description: "Sustainable design practices that are not only eco-friendly but also stylish and timeless.", image: "https://via.placeholder.com/400x300" }
    ];

   const categorySelect = document.getElementById('category');
   const blogPostsContainer = document.getElementById('blog-posts');
   const pageNum = document.getElementById('page-num');

   function displayPosts() {
       // Filter posts by category
       const selectedCategory = categorySelect.value;
       const filteredPosts = posts.filter(post => selectedCategory === 'all' || post.category === selectedCategory);

       // Paginate posts
       const startIndex = (currentPage - 1) * postsPerPage;
       const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

       // Clear current posts
       blogPostsContainer.innerHTML = '';

       // Render paginated posts
       paginatedPosts.forEach(post => {
           const postElement = document.createElement('div');
           postElement.classList.add('post', 'bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');
           postElement.innerHTML = `
          <img src="${post.image}" alt="Post Image" class="w-full h-48 object-cover">
          <div class="p-6">
            <h3 class="text-2xl font-semibold text-gray-800 mb-4">${post.title}</h3>
            <p class="text-gray-600 mb-4">${post.description}</p>
            <button class="text-blue-600 hover:text-blue-800" onclick="window.location.href='#'">Read More</button>
          </div>
        `;
           blogPostsContainer.appendChild(postElement);
       });

       // Update page number
       pageNum.textContent = `Page ${currentPage}`;
   }

   function changePage(direction) {
       if (direction === 'next' && currentPage * postsPerPage < posts.filter(post => categorySelect.value === 'all' || post.category === categorySelect.value).length) {
           currentPage++;
       } else if (direction === 'prev' && currentPage > 1) {
           currentPage--;
       }
       displayPosts();
   }

   // Initialize page
   categorySelect.addEventListener('change', () => {
       currentPage = 1; // Reset to first page when category changes
       displayPosts();
   });

   // Initial display
   displayPosts();
   
      // Set current year dynamically
   document.getElementById('year').textContent = new Date().getFullYear();

   // Newsletter form submission
   document.getElementById('newsletterForm').addEventListener('submit', function(e) {
       e.preventDefault();
       const emailInput = document.getElementById('emailInput').value;
       const formMessage = document.getElementById('formMessage');

       if (validateEmail(emailInput)) {
           formMessage.textContent = 'Subscription successful!';
           formMessage.classList.remove('hidden');
           formMessage.classList.add('text-green-500');
       } else {
           formMessage.textContent = 'Please enter a valid email address.';
           formMessage.classList.remove('hidden');
           formMessage.classList.add('text-red-500');
       }
   });

   // Email validation function
   function validateEmail(email) {
       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return re.test(email);
   }