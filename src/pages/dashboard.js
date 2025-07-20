// // pages/dashboard.js
// import { getSession } from "next-auth/react";

// export default function DashboardPage({ user }) {
//   return (
//     <div>
//       <h1>Welcome {user.email}</h1>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       // redirect: {
//       //   destination: "/login",
//       //   permanent: false,
//       // },
//     };
//   }

//   return {
//     props: {
//       user: session.user,
//     },
//   };
// }
