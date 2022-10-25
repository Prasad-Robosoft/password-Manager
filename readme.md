/signup
--require user mobile number and saves to database
--mpin is hashed and saved into db
--both mpin and mobile numbers are validated

/signin
--require mobile number and mpin
--checks if user is registered
--mpin is compared with hash in db
--if true user is logged inn
--internally frontend hits /getRefresh 

/getRefresh
--generates refresh token and saves it to db

/getAccessToken
--validated by refresh token if refresh token did not expire new access token is created
--deletes old expired refresh token

forgot password

/getSecret
--generates 20 digit secret key for totp

/genOtp
--generates totp using secret key which expires in 60 seconds

/verifyOtp
--verifies otp if its expired or not and validates otp

/forgotPassword
--hashes the password and updates the password after otp verification

site actions

/saveSites
--saves site details of perticular users with mobile number

/filterSites
--filters sites based on pericular sector such as social media or bank

/editSite
--edit site detals such as password, siteUrl and sector

/search
--searches based on a key text uses regex

/getSites
--gets all the site details of perticular user
--uses pagination

logout

/logout
--deletes refrsh token
--clears authheader