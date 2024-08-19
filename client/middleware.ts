import { auth } from "./lib/auth/auth";

export default auth((req: any) => {
    if (!req.auth && req.nextUrl.pathname !== "/auth/login" && req.nextUrl.pathname !== "/auth/signup" && !(req.nextUrl.pathname as string).startsWith("/rate")) {
        const newUrl = new URL("/auth/login", req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
