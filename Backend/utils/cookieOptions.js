export const accessCookieOptions = {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES,  // set it to true in production to use https
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
}

export const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.SECURE_COOKIES,  // set it to true in production to use https
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000
}
