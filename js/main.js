"use strict";

/**
 * Mobile navigation: toggles the menu open/closed and keeps the
 * aria-expanded state in sync for screen readers.
 */
function initMobileNav() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    if (!toggle || !menu) {
        return;
    }

    const closeMenu = () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Navigation öffnen");
    };

    const openMenu = () => {
        menu.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Navigation schliessen");
    };

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.contains("is-open");
        isOpen ? closeMenu() : openMenu();
    });

    // Close the menu after a link is chosen (mobile UX).
    menu.querySelectorAll(".navbar__link").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

/**
 * Highlights the navigation link matching the section currently
 * in view while the user scrolls.
 */
function initActiveNavHighlighting() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".navbar__link");

    if (!sections.length || !links.length) {
        return;
    }

    const setActiveLink = (id) => {
        links.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", isMatch);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        },
        { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initActiveNavHighlighting();
});
