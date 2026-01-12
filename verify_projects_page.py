
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Navigate to the projects page
    page.goto("http://127.0.0.1:4000/projects/")

    # Verify the Hero Section
    expect(page.get_by_role("heading", name="My Projects")).to_be_visible()
    expect(page.get_by_text("A collection of my work in robotics, web development, and software engineering.")).to_be_visible()

    # Verify Featured Projects Section
    expect(page.get_by_role("heading", name="Featured Projects")).to_be_visible()
    # Check for Gamers Hub card
    expect(page.get_by_role("heading", name="Gamers Hub")).to_be_visible()

    # Verify Project Log Section
    expect(page.get_by_role("heading", name="Project Log")).to_be_visible()

    # Check for presence of project cards in the grid
    # We expect at least one project card from the posts
    # "Tetris Machine Learning" is the latest post
    expect(page.get_by_role("heading", name="Tetris Machine Learning")).to_be_visible()

    # Verify Pagination is present
    expect(page.get_by_role("navigation", name="Project pagination")).to_be_visible()

    # Take a screenshot
    page.screenshot(path="projects_page_verification.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
