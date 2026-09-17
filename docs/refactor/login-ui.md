# Login UI

The login page follows the supplied form reference: email/password, visibility toggle, remember choice, recovery action, five social providers and signup link. Input and submit height use the existing 48px component size. Site typography and radii are retained. Provider brand colors are local exceptions.

Authentication is not implemented in the existing repository: the former login buttons only set a mock role in sessionStorage. The new credential form does not grant a role, transmit credentials, or persist passwords. Valid submissions and social actions show failure feedback until a real authentication service is integrated. The remember choice is UI only until that service supports persistent sessions. Recovery directs users to the office number; no recovery email is sent. Real credentials must be handled server-side, with provider OAuth configuration and server sessions before production authentication is enabled.
