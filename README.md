## Homepage of Hackerspace Kraków

## Development

1. Install [Hugo](https://gohugo.io/installation/). (`apt-get install hugo`, `brew install hugo`, etc.)
2. Run `hugo server` in the root directory of this repository.
3. Visit `http://localhost:1313`.

Alternatively you can just `docker-compose up` and visit `http://localhost:1313`.

## Building

1. Run `hugo` in the root directory of this repository.

## Project structure

- `content/` - HTML pages with content
- `layouts/` - THe layout & structure of the website
    - `layouts/partials/sponsors.html` - Sponsors
- `assets/` - CSS, JS, images, etc.
- `hugo.yaml` - Site configuration, main menu lives here
