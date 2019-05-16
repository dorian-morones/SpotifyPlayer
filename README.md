# in progress...

## Authentication

Spotify uses OAuth2 for authentication and authorization.
As of May 29, 2017 all Web API endpoints require an access token.

You can authenticate using a client credentials flow, but this does not provide any authorization to access a user's private data. For most use cases, you'll want to use the authorization code flow. This package includes an Authenticator type to handle the details for you.

Start by registering your application at the following page:

https://developer.spotify.com/my-applications/.

You'll get a client ID and secret key for your application. An easy way to provide this data to your application is to set the SPOTIFY_ID and SPOTIFY_SECRET environment variables. If you choose not to use environment variables, you can provide this data manually.

// the redirect URL must be an exact match of a URL you've registered for your application
// scopes determine which permissions the user is prompted to authorize
auth := spotify.NewAuthenticator(redirectURL, spotify.ScopeUserReadPrivate)

// if you didn't store your ID and secret key in the specified environment variables,
// you can set them manually here
auth.SetAuthInfo(clientID, secretKey)

## You may find the following resources useful:

    Spotify's Web API Authorization Guide: https://developer.spotify.com/web-api/authorization-guide/

    Go's OAuth2 package: https://godoc.org/golang.org/x/oauth2/google

## Helpful Hints
Optional Parameters

Many of the functions in this package come in two forms - a simple version that omits optional parameters and uses reasonable defaults, and a more sophisticated version that accepts additional parameters. The latter is suffixed with Opt to indicate that it accepts some optional parameters.
Automatic Retries

The API will throttle your requests if you are sending them too rapidly. The client can be configured to wait and re-attempt the request. To enable this, set the AutoRetry field on the Client struct to true.

For more information, see Spotify rate-limits.
API Examples

Examples of the API can be found in the examples directory.

You may find tools such as Spotify's Web API Console or Rapid API valuable for experimenting with the API.
