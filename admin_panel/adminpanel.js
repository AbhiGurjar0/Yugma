// Navigation functionality
        function showSection(sectionName) {
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.add('hidden'));

            // Show selected section
            document.getElementById(sectionName + '-section').classList.remove('hidden');

            // Update page title
            const titles = {
                'dashboard': 'Dashboard Overview',
                'banners': 'Banner Management',
                'waste': 'Waste Management Solutions',
                'alerts': 'Crop Alerts Management',
                'submissions': 'Form Submissions'
            };
            document.getElementById('page-title').textContent = titles[sectionName];

            // Update active nav item
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.classList.remove('bg-green-700', 'text-white');
                item.classList.add('text-gray-300');
            });

            // Find and highlight current nav item
            const currentNav = Array.from(navItems).find(item =>
                item.getAttribute('onclick').includes(sectionName)
            );
            if (currentNav) {
                currentNav.classList.add('bg-green-700', 'text-white');
                currentNav.classList.remove('text-gray-300');
            }

            // Close mobile sidebar after selection
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        }

        // Mobile sidebar toggle
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');

            if (sidebar.classList.contains('-translate-x-full')) {
                sidebar.classList.remove('-translate-x-full');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        }

        // Close sidebar when clicking outside on mobile
        window.addEventListener('resize', function () {
            if (window.innerWidth >= 768) {
                document.getElementById('sidebar-overlay').classList.add('hidden');
                document.getElementById('sidebar').classList.remove('-translate-x-full');
            }
        });

        // Initialize dashboard view
        document.addEventListener('DOMContentLoaded', function () {
            showSection('dashboard');
        });