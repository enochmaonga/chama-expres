import Link from "next/link";

// pages/signed-out.js
const SignedOut = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>You have successfully signed out.</h1>
    <p><Link href="/">Go to Home</Link></p>
  </div>
);

export default SignedOut;
