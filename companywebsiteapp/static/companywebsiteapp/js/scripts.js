
/* =====================================================
   GORGONS CLEANING COMPANY
   JavaScript functionality
   File: static/companywebsiteapp/js/scripts.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ================================================
    // 1. BACK TO TOP BUTTON
    // ================================================

    const backToTopButton = document.getElementById("backtotop");

    // Make the button visible only after scrolling.
    if (backToTopButton) {

        backToTopButton.hidden = window.scrollY < 350;

        window.addEventListener("scroll", function () {
            backToTopButton.hidden = window.scrollY < 350;
        }, { passive: true });

    }

    // Your HTML already calls backtotop() using onclick.
    window.backtotop = function () {

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "auto" : "smooth"
        });

    };


    // ================================================
    // 2. MOBILE NAVIGATION MENU
    // ================================================

    const navigation = document.querySelector("#introductionnav nav");
    const navigationList = navigation?.querySelector("ul");

    if (navigation && navigationList) {

        const menuButton = document.createElement("button");

        menuButton.type = "button";
        menuButton.className = "mobile-menu-toggle";
        menuButton.textContent = "Menu";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "main-navigation-links");

        navigationList.id = "main-navigation-links";

        navigationList.parentNode.insertBefore(
            menuButton,
            navigationList
        );

        function closeMenu() {

            navigationList.classList.remove("is-open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "Menu";

        }

        menuButton.addEventListener("click", function () {

            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            navigationList.classList.toggle("is-open", !isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menuButton.textContent = !isOpen ? "Close menu" : "Menu";

        });

        // Close the menu after a navigation link is clicked.
        navigationList.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        // Close the menu when Escape is pressed.
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close the menu when the viewport becomes desktop-sized.
        window.addEventListener("resize", function () {

            if (window.innerWidth > 700) {
                closeMenu();
            }

        });

    }


    // ================================================
    // 3. ACTIVE NAVIGATION LINKS
    // ================================================

    const navigationLinks = document.querySelectorAll(
        '#introductionnav nav a[href^="#"]'
    );

    const observedSections = Array.from(navigationLinks)
        .map(function (link) {

            const sectionId = link.getAttribute("href");

            return document.querySelector(sectionId);

        })
        .filter(Boolean);

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    navigationLinks.forEach(function (link) {
                        link.removeAttribute("aria-current");
                    });

                    const activeLink = document.querySelector(
                        '#introductionnav nav a[href="#' +
                        entry.target.id + '"]'
                    );

                    if (activeLink) {
                        activeLink.setAttribute(
                            "aria-current",
                            "location"
                        );
                    }

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        observedSections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    // ================================================
    // 4. REVEAL CONTENT WHEN SCROLLING
    // ================================================

    const revealElements = document.querySelectorAll(
        "#aboutsection, " +
        "#servicessection .expertisearea, " +
        "#trustnote > div, " +
        ".testimonial-card"
    );

    // Respect the visitor's reduced-motion preference.
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {

        revealElements.forEach(function (element) {

            element.style.opacity = "0";
            element.style.transform = "translateY(16px)";

            element.style.transition =
                "opacity 450ms ease, transform 450ms ease";

        });

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    }


    // ================================================
    // 5. CONTACT FORM VALIDATION
    // ================================================

    const contactForm = document.querySelector("#contact form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            // Validate before allowing submission.
            if (!contactForm.checkValidity()) {

                event.preventDefault();
                contactForm.reportValidity();

                return;

            }

            // A Django backend should handle actual form submission.
            // Do not prevent the default action here: the form can
            // submit normally to its configured Django endpoint.

        });

    }


    // ================================================
    // 6. FOOTER COPYRIGHT YEAR
    // ================================================

    const copyrightParagraph = document.querySelector("footer p");

    if (copyrightParagraph) {

        // Django's {% now "Y" %} already provides the year.
        // No JavaScript change is needed for this project.

    }


    // ================================================
    // 7. DEBUGGING CONFIRMATION
    // ================================================

    console.log(
        "Gorgons Cleaning Company JavaScript loaded successfully."
    );

});
