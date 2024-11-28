// Function to toggle URL mode and retain scroll position
function toggleMode(button) {
    const currentUrl = window.location.href;

    // Capture the current scroll position
    const scrollPosition = {
        x: window.scrollX,
        y: window.scrollY,
    };

    // Save the scroll position in sessionStorage
    sessionStorage.setItem("scrollPosition", JSON.stringify(scrollPosition));

    if (currentUrl.includes("?mode=view")) {
        // Switch to edit mode
        const newUrl = currentUrl.replace("?mode=view", "?mode=edit");
        window.location.href = newUrl; // Redirect to the new URL
    } else if (currentUrl.includes("?mode=edit")) {
        // Switch back to view mode
        const newUrl = currentUrl.replace("?mode=edit", "?mode=view");
        window.location.href = newUrl; // Redirect to the new URL
    }
}

// Function to update the button text based on the current mode
function updateButtonText(button) {
    const currentUrl = window.location.href;
    if (currentUrl.includes("?mode=view")) {
        button.textContent = "🖉";
    } else if (currentUrl.includes("?mode=edit")) {
        button.textContent = "View";
    }
}

// Restore scroll position after a short delay to allow page to settle
function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
        const { x, y } = JSON.parse(scrollPosition);

        // Introduce a delay to ensure the page layout is settled before restoring scroll
        setTimeout(() => {
            window.scrollTo(x, y);
            sessionStorage.removeItem("scrollPosition"); // Clear the stored position after restoring
        }, 500); // Adjust the delay time if needed (in milliseconds)
    }
}

// Check if the floating button already exists to avoid duplicates
if (
    !document.getElementById("urlModeSwitcherButton") &&
    (window.location.href.includes("experiments.php?mode=view") ||
        window.location.href.includes("experiments.php?mode=edit") ||
        window.location.href.includes("database.php?mode=view") ||
        window.location.href.includes("database.php?mode=edit"))
) {
    // Inject the CSS file
    function injectCSS(filename) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = chrome.runtime.getURL(filename);
        document.head.appendChild(link);
    }
    injectCSS("style.css");

    // Create the button
    const button = document.createElement("button");
    button.id = "urlModeSwitcherButton";

    // Set initial button text based on the current mode
    updateButtonText(button);

    // Add the button to the document
    document.body.appendChild(button);

    // Add click event listener to toggle between modes
    button.addEventListener("click", () => {
        toggleMode(button);
        // Update the button text after the URL changes
        setTimeout(() => updateButtonText(button), 100); // Slight delay to ensure URL changes
    });

    // Restore scroll position on page load
    restoreScrollPosition();
}

