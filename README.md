MiniStore – Requirement Specification
Tech Stack: React 18 + TypeScript · React Query v5 · React Router · Fake Store API (local Nest
server on http://localhost:3000/api/v1)
1 Goal
Build a small e‑commerce SPA that demonstrates all core React Query patterns—paginated
fetching, caching/stale‑time control, optimistic mutations, query invalidation, pre‑fetching, and
offline persistence—while interacting only with the locally running Fake Store API.
2 React Query APIs to Use
Category Concrete API Calls / Hooks Purpose in this project
Data fetching useQuery, useInfiniteQuery,
useQueries
Products list, detail pages,
categories, cart & profile
Mutations useMutation Login, add/update/remove
cart items
Cache utilities queryClient.prefetchQuery,
queryClient.setQueryData,
queryClient.invalidateQueries,
queryClient.cancelQueries
Pre‑loading product detail,
optimistic cart updates,
manual cache writes,
cancelling in‑flight queries
Persistence /
hydration
persistQueryClient (IndexedDB) Offline support & session
keep‑alive
Global status isFetching from useIsFetching or
queryClient.isFetching()
Show top‑bar loader
Error handling error properties on queries & mutations,
plus onError callbacks
Toast or modal display
3 API Endpoints Needed
Function Method & Path Notes
List products
(paginated)
GET
/products?offset=0&l
imit=20
Use offset‑based infinite scroll or “Load
More”
Search products GET
/products?title=<que
ry>
Combine with pagination
Product detail GET /products/{id} Pre‑fetch on card hover
Categories GET /categories Load once, cache 1 day
Login POST /auth/login Demo account john@mail.com /
changeme; returns accessToken
Refresh token POST
/auth/refresh-token
Optional; extend session
Current user GET /auth/profile Needs Bearer token
Cart (add) POST /carts/add Body: { userId, products: [{ id,
quantity }] }
Cart update PUT /carts/{cartId} Optimistic update quantity
Cart delete DELETE
/carts/{cartId}
Remove cart or items
4 Pages / Routes
Route Component Key Features & React Query Usage
/login LoginPage useMutation → POST /auth/login; on success
setQueryData(['auth']); redirect to /products
/products ProductListPage useInfiniteQuery for /products; search box
debounced 500 ms; category filter; infinite scroll; global
loader via isFetching
/product/:
id
ProductDetailPag
e
Initial data from prefetchQuery; fallback skeleton;
re‑validate on mount
/cart CartPage useQuery(['cart', userId]); mutations for
add/update/delete with optimistic UI;
invalidateQueries after server round‑trip
/profile ProfilePage Fetch GET /auth/profile; simple info display
* NotFoundPage 404 fallback
Navigation: use React Router v6 with lazy‑loaded pages
(React.lazy + Suspense) to minimize initial bundle.
5 Functional Requirements (high level)
1. Paginated product browsing (infinite scroll or “Load More”).
2. Search & category filtering (combine into the query key).
3. Product detail with pre‑fetch and skeleton fallback.
4. Secure login flow that saves accessToken and injects it in every request.
5. Shopping cart with optimistic add/update/delete and rollback on error.
6. Global loading indicator when any query is fetching.
7. Toast error handling for all query/mutation failures.
8. Offline mode—previously viewed pages load when network is gone (IndexedDB
persistence).
7 Backend — Local Quick Start
1. download the backend starter code
2. switch node to version 20
3. npm install
4. npm start
5. test the api: localhost:3000/api/v1/products?offset=0&limit=10
6. look at the doc: https://fakeapi.platzi.com/en/rest/products/#pagination