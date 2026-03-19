export const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES,  // set it to true in production to use https
    sameSite: "lax",
    maxAge: 15 * 60 * 1000
}

export const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES,  // set it to true in production to use https
    sameSite: "lax",
    maxAge: 1 * 24 * 60 * 60 * 1000
}

export const resetCookieOptions = {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES,  // set it to true in production to use https
    sameSite: "lax",
    maxAge: 2 * 60 * 1000
}