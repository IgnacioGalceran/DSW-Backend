import admin, { ServiceAccount } from "firebase-admin";

interface CustomServiceAccount extends ServiceAccount {
  type: string;
}

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "dsw-turnosmedicos",
    private_key_id: "343b909ffe042191be054d07dad84f4d0b86a259",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDrBxvNnv3rMfi4\nGMIiVc8eCu6+ylX0s82phrDZH1jFOkgFhTeNenRzDwFEoOqxeOHn3P1nltx4YMBC\nbS87y/fpnBEytFn9slQfW2gP40CHhXapswa08yVwDNVjFJpj+GIML6Us+5F/1Ppo\nb9UFqauj/kZO/CU1D3rBro82SUn781X2Mpneig+VA2i9mFmJQK79cUG0NbojvKnx\nUFEnpfBvU5PztYIpQjHoBhNAnxM4EZv7Q85/uLK5xoOh1Vgkatzemr1W+QyupHzj\nuBfmGRquN08cFIP34NdbcU6cWdPZpxHcXXfSkAmJk9PQonvsjS3cVbNwdqXVlFCw\nZ5UY0TjLAgMBAAECggEAQztj2TTHp03CvAsdEcxhNNNky4A/CYKb7QhiM6Izdyv+\naVHb++VRRY6/yp2LtZwCZ50Agm8V/3uR1A6+ycjF0PZ7tvj/m0K1rMitooncLkhg\nExhq7T128rBBJJhCuCFYDutcQVtvmlVXEqQXGIkaWA3HmBWqIR0d/STNw/ZAK0m6\n6kYswdi2HXGu2rXT8q6NLGLJFYdgN2TdoG3dizzbH/iihxUm4uWLdHpENl9s1zz5\nj1w0FT6HK8k+FtajQcJB1Kj0ri9OtxlTtUURsf43VDG65CM6SrxUP5pK1xBEwJqz\nvBJKBZUB55spCl+nKK3tLeUUY3caNJ+6ZuFPJfdg0QKBgQD6TIMjVcEXdwQGpAD7\nbpATV4eKuOMXiAnXPnPOracEzl8VBsYn5Dk3VprdyoNClm2SxQpkUq8pJcU1ojYG\niJNFIZasXd1TijOisVqQZqGUyeNG2dBfh8bKjRJJvMiYeXZtiVJPJYig5v/1VWhj\nub7gp4LG/rSAn8QR47gSSghN+wKBgQDwYY0CuYONwwsaIcZqDWkF2FeM5+mcLEV3\nKEZ7GfJhSmz2KotpNS6whA3fjg0UAPMN5dUxirlHyIfkPr19EVS2s9lv5RxI0Pre\nG4z2AFvtqlx/TmkrU9H980RPcjHjKIn/IJ8htqmJW6weXdThz/D+k1ki4Ul3MVJi\nqdB0IavXcQKBgGoeynLOxuE1+qT+H9R6Wed5cuQj41R0vwddWShFg8yL2tBFYPpE\nzuVheKOUWvZ+ZNKXbAKA8/bUJrrInXNDsHzc8s79tPrYW3AdFbKncNZuikfdzXTT\nUjtKeHh+6+WJieaDFDyuQzFE/zx7C5lMhVsmalIIZ2spUa3sCHzomoDFAoGAEWHM\nc4z8oUygSeR1V4fet0h8lDjU4LEm2MX1ysMGjth15psO962b0bHK2waHlZG4AaJD\n91Ajs7ghc3TB+QA+0vNQXtH/aJiL+3GckNFX1GjERYRjAHoQLj/gCaqlRtrQl71B\nJIvz2HXjjVKVqTqDH7WB9Y665D6RyYakBzHEHlECgYEA6iZ/mQoeboAxwAw4BUgm\nIDrWnLMGeBobewobkaQNeIvf5EZZzb5L7/hKGF4E+q9cbD6HzxTAnB1O+QtIzonN\nGrhAG19uTJa9jELq31RB9/FElVXuqB1Dt5x564xFCAj+gfec5Tl1IEQlPAiubIJw\ntGAFohnbzV9W1JfAx414onU=\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-gl3zb@dsw-turnosmedicos.iam.gserviceaccount.com",
    client_id: "104684133216397960221",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gl3zb%40dsw-turnosmedicos.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  } as CustomServiceAccount),
});
