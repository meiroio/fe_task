# Meiro FE task

In case of questions reach out to moses.skoda@meiro.io.

Your task is to create a frontend using React and any other libraries (including component libraries) or metaframework of your choice. We provide an API, described below.

There is no design provided; crafting styles to conform to a design would take a lot of your time without telling us much. Your UI should be clear to the user from a UX perspective, but it doesn't need to look pretty.

To complete the task, fork this repo and create a pull request with your solution from your fork back to this repo.

## What we'll be evaluating

We would like to see clean code with idiomatic handling of data fetching, state management, component structure, and styling, which would stay maintainable if more routes, resources, and functionality were added.

We would also like to see good UX.

We do not evaluate accessibility, responsiveness, or aesthetic choices.

## Requirements

There should be 3 frontend routes. They should all contain a navigation header with links to `/` and `/attributes`.

### `/` – Home

Can be empty; only used for us to see the behavior when the user navigates away from `/attributes` and back.

### `/attributes` – Attributes list

A paginated table of attributes with infinite scroll (when the user reaches the bottom of the screen, more attributes automatically load).

There should be a search input which controls the `searchText` query parameter for the `GET /attributes` API call.

The table should have the columns "Name" (displays the attribute name), "Labels" (displays the names of labels attached to the attribute), "Created at" (displays the createdAt date).

"Name" and "Created at" should be sortable (controls the `sortBy` and `sortDir` query parameters for `GET /attributes`).

The value of the search input and sort state should be persisted if the user clicks through to the attribute detail page and comes back (either clicking "back" in the browser or the backlink on the detail page), but _not_ if we use the header navigation to go to Home and then to go to Attributes.

Each row should contain (or be) a link to the detail page of that attribute, and should also have a delete button which triggers a confirmation modal and upon confirmation deletes the attribute and notifies the user of successful deletion.

### `/attributes/:id` – Attribute detail

Shows the name of the attribute, a delete button that works the same as the list page delete buttons, a list of label names attached to that attribute, and a link/button going back to the list page.

## Backend installation

1. `cd backend`
2. `npm install`
3. `npm start`

The backend will be available on http://127.0.0.1:3000/

## API reference

Types:

```ts
type Attribute = {
  id: string
  name: string
  createdAt: string // ISO8601
  labelIds: Array<Label<"id">>
  deleted: boolean
}

type Label = {
  id: string
  name: string
}
```

### `GET /attributes`

Query params:

- **offset** (int)
  - default 0
- **limit** (int)
  - default 10
  - max 10
- **searchText** (string)
  - default ""
- **sortBy** (enum["name", "createdAt"])
  - default "name"
- **sortDir** (enum["asc", "desc"])
  - default "asc"

Response:

```ts
{
  data: Array<Attribute>
  meta: {
    offset: number
    limit: number
    searchText: string
    sortBy: "name" | "createdAt"
    sortDir: "asc" | "desc"
    hasNextPage: boolean
  }
```

### `GET /attributes/:id`

Response:

```ts
{
  data: Attribute
}
```

### `DELETE /attributes/:id`

Response:

```ts
{
  data: Attribute
}
```

### `GET /labels`

Query params:

- **offset** (int)
  - default 0
- **limit** (int)
  - default 10
  - max 10

Response:

```ts
{
  data: Array<Label>
  meta: {
    offset: number
    limit: number
    hasNextPage: boolean
  }
}
```
