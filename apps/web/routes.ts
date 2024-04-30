/**
 * An array of routes that are accessible to public, do  not require the authtentication
 */

export const publicRoutes:string[] = [

  "/"

]

/**
 * An array of routes used for authentication, Logged in users will get redirected to to dashboard 
 */

export const authRoutes:string[] = [
  "/auth/signin","/auth/signup","/auth/error"
]

/**
 * The prefix for the API authentication routes that start with this prefix are used for authentication purposes
 */

export const authApiPrefix:string = "/api/auth"

/**
 * Default redirect path for logged in users
 */

export const DEFAULT_LOGIN_REDIRECT = "/myaccount/dashboard"